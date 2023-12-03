import { ChatMessageDto } from './chat.message.dto';

export class ChatMessageResponseDto {
  messages: ChatMessageDto[];
  startLogId: string;

  constructor(startLogId: string, messages: ChatMessageDto[]) {
    this.messages = messages;
    this.startLogId = startLogId;
  }
}
