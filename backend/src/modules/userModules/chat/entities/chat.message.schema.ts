import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatType } from '@src/enum/chat.type';
import { HydratedDocument } from 'mongoose';

@Schema()
export class ChatMessage {
  @Prop()
  user_id: number;

  @Prop()
  user_nickname: string;

  @Prop()
  chat_message: string;

  @Prop()
  type: ChatType;

  @Prop()
  chat_date: Date;

  @Prop()
  log_id: string;
}
export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

export type ChatMessageDocument = HydratedDocument<ChatMessage>;
