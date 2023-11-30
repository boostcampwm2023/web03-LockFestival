import { ChatType } from '@enum/chat.type';

export class ChatMessageResponseDto {
  logId: string;
  chatMessage: string;
  chatType: ChatType;
  chatDate: Date;
  sender: string;

  constructor(message) {
    this.logId = message._id.toString();
    this.chatMessage = message.chat_message;
    this.chatType = message.type;
    this.chatDate = message.chat_date;
    this.sender = message.sender.user_nickname;
  }
}
