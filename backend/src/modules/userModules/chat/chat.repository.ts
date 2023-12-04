import mongoose, { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import { Room } from '@chat/entities/room.schema';
import { ChatUnreadDto } from '@chat/dtos/chat.unread.dto';
import { ChatMessageRequestDto } from '@chat/dtos/chat.message.request.dto';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';
import { ChatType } from '@enum/chat.type';
import { User } from '@user/entities/user.entity';

@Injectable()
export class ChatRepository {
  private readonly logger = new Logger(ChatRepository.name);
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    @InjectModel(ChatUser.name) private chatUserModel: Model<ChatUser>
  ) {}

  async createRoomByLeader(groupId: number, user: User) {
    const userObject = await this.chatUserModel.create({
      user_id: user.id,
      user_nickname: user.nickname,
      user_profile_url: user.profileImageUrl,
      is_leader: true,
      is_leave: false,
    });
    await this.roomModel.create({
      group_id: groupId,
      user_list: userObject._id,
    });
  }

  async createMessageByChat(chatMessageDto: ChatMessageRequestDto): Promise<ChatMessageDto> {
    const objectId = new mongoose.Types.ObjectId(chatMessageDto.userId);
    const chat = await this.chatMessageModel.create({
      chat_message: chatMessageDto.message,
      sender: objectId,
      type: chatMessageDto.type,
      chat_date: chatMessageDto.time,
    });

    this.logger.log('make chat with user');
    this.logger.log(chat);

    await this.roomModel
      .updateOne(
        {
          group_id: chatMessageDto.groupId,
        },
        {
          $push: {
            chat_list: chat._id,
          },
          $set: {
            last_chat: chat._id,
          },
        }
      )
      .exec();

    return new ChatMessageDto(chat);
  }
  async findMessagesByStartLogId(chatUnreadDto: ChatUnreadDto): Promise<ChatMessageDto[]> {
    const options = {
      sort: { _id: chatUnreadDto.direction },
    };

    if (chatUnreadDto?.count > 0) {
      options['limit'] = chatUnreadDto.count;
    }

    const directionOptions =
      chatUnreadDto.direction === 1
        ? { $gte: chatUnreadDto.cursorLogId }
        : { $lt: chatUnreadDto.cursorLogId };

    const chatMessageDtos = (
      await this.roomModel.findOne({ group_id: chatUnreadDto.roomId }).populate({
        path: 'chat_list',
        model: 'ChatMessage',
        match: { _id: directionOptions },
        options,
      })
    ).chat_list.map((message) => {
      return new ChatMessageDto(message);
    });

    return chatUnreadDto.direction === 1 ? chatMessageDtos : chatMessageDtos.reverse();
  }

  async findUserListWithLeavedUserByRoomId(roomId: string): Promise<ChatUserInfoDto[]> {
    const queryResult = await this.roomModel
      .findOne({ group_id: roomId })
      .select({ user_list: 1, _id: 0 })
      .populate({
        path: 'user_list',
        model: ChatUser.name,
      })
      .lean();

    if (!queryResult) {
      throw new Error('존재하지 않는 방입니다.');
    }

    return queryResult.user_list.map((user) => {
      return new ChatUserInfoDto(user);
    });
  }

  async findUserListByRoomId(roomId: string): Promise<ChatUserInfoDto[]> {
    const userList: ChatUserInfoDto[] = (
      await this.findUserListWithLeavedUserByRoomId(roomId)
    )?.filter((roomUser: ChatUserInfoDto) => {
      return !roomUser.isLeave;
    });

    return userList;
  }

  async validateRoomAndGetChatUserList(
    roomId: string,
    nickname: string
  ): Promise<ChatUserInfoDto[]> {
    const userList: ChatUserInfoDto[] = await this.findUserListWithLeavedUserByRoomId(roomId);

    const isUserInRoom: boolean = userList
      .filter((roomUser: ChatUserInfoDto) => {
        return !roomUser.isLeave;
      })
      .some((roomUser: ChatUserInfoDto) => {
        return roomUser.nickname === nickname;
      });

    if (!isUserInRoom) {
      throw new Error('유저가 방에 없습니다.');
    }

    return userList;
  }

  async validateLeaderByRoomId(groupId: string, user_id: string): Promise<boolean> {
    const userList: ChatUserInfoDto[] = await this.findUserListByRoomId(groupId);

    return userList.some((user: ChatUserInfoDto) => {
      return user.isLeader && user.userId === user_id;
    });
  }

  async updateRead(userId: string) {
    await this.chatUserModel.updateOne(
      {
        _id: userId,
      },
      {
        $unset: {
          last_chat_log_id: true,
        },
      }
    );
  }

  async findLastChatLogIdByRoomId(roomId: string) {
    const roomInfo = await this.roomModel.findOne({ group_id: roomId });
    if (!roomInfo) {
      throw new Error('방 정보를 찾을 수 없습니다.');
    }
    return roomInfo.last_chat.toString();
  }

  async updateLastChatLogId(userId: string, lastChatLogId: string) {
    await this.chatUserModel.updateOne(
      {
        _id: {
          $eq: { _id: userId },
        },
      },
      {
        $set: {
          last_chat_log_id: lastChatLogId,
        },
      }
    );
  }

  async addUserInRoom(
    groupId: number,
    userId: number,
    nickname: string,
    profileImageUrl: string,
    isLeader: boolean = false
  ): Promise<void> {
    const inChat = await this.chatMessageModel.create({
      chat_message: `${nickname}님이 입장하셨습니다.`,
      chat_date: new Date(),
      type: ChatType.in,
    });

    const chatUser = await this.chatUserModel.create({
      user_id: userId,
      user_nickname: nickname,
      user_profile_url: profileImageUrl,
      is_leader: isLeader,
      is_leave: false,
      last_chat_log_id: inChat._id,
    });

    await this.roomModel
      .updateOne(
        { group_id: groupId },
        {
          $push: {
            user_list: chatUser._id,
            chat_list: inChat._id,
          },
          $set: {
            last_chat: inChat._id,
          },
        }
      )
      .exec();
  }

  async updateUserNickname(originNickname: string, nickname: string) {
    await this.chatUserModel.updateMany(
      { user_nickname: originNickname },
      {
        $set: {
          user_nickname: nickname,
        },
      }
    );
  }
}
