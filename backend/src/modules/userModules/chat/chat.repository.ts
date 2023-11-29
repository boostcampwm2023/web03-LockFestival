import { Injectable } from '@nestjs/common';
import mongoose, { FlattenMaps, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { Room } from '@chat/entities/room.schema';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    @InjectModel(ChatUser.name) private chatUserModel: Model<ChatUser>
  ) {}

  private async findUserListWithLeavedUserByRoomId(roomId: string) {
    const queryResult = await this.roomModel
      .findOne({ group_id: roomId })
      .select({ user_list: 1, _id: 0 })
      .populate({ path: 'user_list', model: ChatUser.name })
      .lean();

    if (!queryResult) {
      throw new Error('존재하지 않는 방입니다.');
    }

    return queryResult.user_list;
  }

  private async findUserListByRoomId(roomId: string): Promise<FlattenMaps<ChatUser>[]> {
    const userList: FlattenMaps<ChatUser[]> = (
      await this.findUserListWithLeavedUserByRoomId(roomId)
    )?.filter((roomUser: FlattenMaps<ChatUser>) => {
      return !roomUser.is_leave;
    });

    return userList;
  }

  async validateRoomAndGetProfiles(roomId: string, user_id: number): Promise<ChatUser[]> {
    const userList: FlattenMaps<ChatUser>[] = await this.findUserListByRoomId(roomId);

    const isUserInRoom: boolean = userList.some((roomUser: ChatUser) => {
      return roomUser._id.equals(new mongoose.Types.ObjectId(user_id));
    });

    if (!isUserInRoom) {
      throw new Error('유저가 방에 없습니다.');
    }

    return userList;
  }

  async validateLeaderByRoomId(groupId: string, user_id: string): Promise<boolean> {
    const userObjectId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(user_id);

    const userList: ChatUser[] = await this.findUserListByRoomId(groupId);

    return userList.some((user: ChatUser) => {
      return user.is_leader && user._id.equals(userObjectId);
    });
  }
}
