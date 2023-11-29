import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class ChatMessage {
  @Prop()
  user_id: number;

  @Prop()
  user_nickname: string;

  @Prop()
  chat_message: string;

  @Prop()
  chat_date: Date;

  @Prop()
  log_id: string;
}
export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

@Schema()
export class ChatUser {
  @Prop()
  user_id: number;

  @Prop()
  user_nickname: string;

  @Prop()
  user_profile: string;

  @Prop()
  last_chat_log_id: number;
}
export const ChatUserSchema = SchemaFactory.createForClass(ChatUser);

export type ChatDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop()
  group_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ChatUser }] })
  user_list: ChatUser[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ChatMessage }] })
  chat_list: ChatMessage[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
