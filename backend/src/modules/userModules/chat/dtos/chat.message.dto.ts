import { ChatType } from '@enum/chat.type';
export class ChatMessageDto {
  message: string;
  userId: string;
  groupId: number;
  type: ChatType;
  time: Date;
}
