import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatUser } from '@chat/entities/chat.user.schema';
import { ChatMessage } from '@chat/entities/chat.message.schema';

@Schema()
export class Room extends Document {
  @Prop()
  group_id: string;

  @Prop({ type: [ChatUser] })
  user_list: ChatUser[];

  @Prop({ type: [ChatMessage] })
  chat_list: ChatMessage[];

  @Prop({ type: ChatMessage })
  last_chat: ChatMessage;
}
export const RoomSchema = SchemaFactory.createForClass(Room);
