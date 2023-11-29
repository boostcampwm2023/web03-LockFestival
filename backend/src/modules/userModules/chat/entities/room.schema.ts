import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Room extends Document {
  @Prop()
  group_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ChatUser.name }] })
  user_list: ChatUser[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ChatMessage.name }] })
  chat_list: ChatMessage[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: ChatMessage.name })
  last_chat: ChatMessage;
}
export const RoomSchema = SchemaFactory.createForClass(Room);
