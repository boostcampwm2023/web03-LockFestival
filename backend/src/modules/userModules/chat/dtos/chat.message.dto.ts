import { ChatType } from '@enum/chat.type';
export class ChatMessageDto {
  message: string;
  userId: number;
  groupId: number;
  type: ChatType;
  time: Date;
}
