import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class ChatUser extends Document {
  @Prop()
  user_id: number;

  @Prop()
  user_nickname: string;

  @Prop()
  user_profile_url: string;

  @Prop()
  is_leader: boolean;

  @Prop()
  is_leave: boolean;

  @Prop()
  last_chat_log_id: string;
}
export const ChatUserSchema = SchemaFactory.createForClass(ChatUser);
