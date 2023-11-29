import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
