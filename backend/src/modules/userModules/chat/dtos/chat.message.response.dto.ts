import { ChatType } from '@enum/chat.type';

export class ChatMessageResponseDto {
  chatId: string;
  message: string;
  type: ChatType;
  time: Date;
  userId: number;

  constructor(chat) {
    this.chatId = chat._id.toString();
    this.message = chat.chat_message;
    this.type = chat.type;
    this.time = chat.chat_date;
    this.userId = Number(chat.sender.user_id);
  }
}
