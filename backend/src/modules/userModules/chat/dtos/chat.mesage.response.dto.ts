import { ChatMessageDto } from '@chat/dtos/chat.message.dto';

export class ChatMessageResponseDto {
  messages: ChatMessageDto[];
  cursorLogId: string;
  direction: number;

  constructor(cursorLogId: string, messages: ChatMessageDto[], direction: number) {
    this.messages = messages;
    this.cursorLogId = cursorLogId;
    this.direction = direction;
  }
}
