import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ChatType } from '@src/enum/chat.type';
import { ChatUser } from '@chat/entities/chat.user.schema';

@Schema({ versionKey: false })
export class ChatMessage {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ChatUser.name })
  sender: ChatUser;

  @Prop()
  chat_message: string;

  @Prop()
  type: ChatType;

  @Prop()
  chat_date: Date;
}
export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
