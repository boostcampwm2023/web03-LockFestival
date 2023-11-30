import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { Room } from '@chat/entities/room.schema';
import { ChatUserInfoDto } from '@chat/dtos/chat.user.info.dto';
import { ChatType } from '@enum/chat.type';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    @InjectModel(ChatUser.name) private chatUserModel: Model<ChatUser>
  ) {}

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
}
