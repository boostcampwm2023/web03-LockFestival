import { ChatType } from '@enum/chat.type';
export class ChatMessageRequestDto {
  message: string;
  userId: string;
  groupId: number;
  type: ChatType;
  time: Date;
  constructor(message: string, userId: string, groupId: number, type: ChatType, time: Date) {
    this.message = message;
    this.userId = userId;
    this.groupId = groupId;
    this.type = type;
    this.time = time;
  }
}
