import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import { Room } from '@chat/entities/room.schema';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    @InjectModel(ChatUser.name) private chatUserModel: Model<ChatUser>
  ) {}

  async createMessgeByChat({ message, type, time, userId, groupId }) {
    const chat = await this.chatMessageModel
      .create({
        chat_message: message,
        type: type,
        chat_date: time,
      })
      .then((chatMessage) => {
        return chatMessage.populate({
          path: 'sender',
          model: 'ChatUser',
          match: { user_id: userId },
        });
      });

    await this.roomModel
      .updateOne(
        {
          group_id: groupId,
        },
        {
          $push: {
            chat_list: chat._id,
          },
        }
      )
      .exec();
  }
  async findMessagesByStartLogId(roomId: string, startLogId: string, count: number) {
    return (
      await this.roomModel.findOne({ group_id: 1 }).populate({
        path: 'chat_list',
        model: 'ChatMessage',
        match: { _id: { $gt: startLogId } },
        options: {
          sort: { _id: 1 },
          // limit: count,
        },
      })
    ).chat_list;
  }
}
