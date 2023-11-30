import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import { Room } from '@chat/entities/room.schema';
import { ChatUnreadDto } from '@chat/dtos/chat.unread.dto';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatMessageResponseDto } from '@chat/dtos/chat.message.response.dto';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    @InjectModel(ChatUser.name) private chatUserModel: Model<ChatUser>
  ) {}

  async createMessgeByChat(chatMessageDto: ChatMessageDto): Promise<ChatMessageResponseDto> {
    const objectId = new mongoose.Types.ObjectId(chatMessageDto.userId);
    const chat = await this.chatMessageModel
      .create({
        chat_message: chatMessageDto.message,
        sender: objectId,
        type: chatMessageDto.type,
        chat_date: chatMessageDto.time,
      })
      .then((message) => {
        return message.populate('sender');
      });

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

    return new ChatMessageResponseDto(chat);
  }
  async findMessagesByStartLogId(chatUnreadDto: ChatUnreadDto): Promise<ChatMessageResponseDto[]> {
    return (
      await this.roomModel.findOne({ group_id: chatUnreadDto.roomId }).populate({
        path: 'chat_list',
        model: 'ChatMessage',
        match: { _id: { $gt: chatUnreadDto.startLogId } },
        options: {
          sort: { _id: 1 },
        },
        populate: {
          path: 'sender',
          model: 'ChatUser',
        },
      })
    ).chat_list.map((message) => {
      return new ChatMessageResponseDto(message);
    });
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
    this.chatUserModel.updateOne(
      {
        _id: {
          $eq: { userId },
        },
      },
      {
        $unset: {
          last_chat_log_id: true,
        },
      }
    );
  }
}
