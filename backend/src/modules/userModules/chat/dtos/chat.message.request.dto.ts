import { ChatType } from '@enum/chat.type';
export class ChatMessageRequestDto {
  message: string;
  userId: string;
  groupId: number;
  type: ChatType;
  time: Date;
}
