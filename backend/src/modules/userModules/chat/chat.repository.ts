import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import { Room } from '@chat/entities/room.schema';
import { ChatUnreadDto } from '@chat/dtos/chat.unread.dto';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatMessageResponseDto } from '@chat/dtos/chat.message.response.dto';

@Injectable()
export class ChatRepository {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(ChatMessage.name) private chatMessageModel: Model<ChatMessage>,
    @InjectModel(ChatUser.name) private chatUserModel: Model<ChatUser>
  ) {}

  async createMessgeByChat(chatMessageDto: ChatMessageDto): Promise<ChatMessageResponseDto> {
    const chatUser = await this.chatUserModel.findOne({ user_id: chatMessageDto.userId });

    const chat = await this.chatMessageModel.create({
      chat_message: chatMessageDto.message,
      sender: chatUser,
      type: chatMessageDto.type,
      chat_date: chatMessageDto.time,
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
          select: 'user_nickname',
        },
      })
    ).chat_list.map((message) => {
      return new ChatMessageResponseDto(message);
    });
  }
}
