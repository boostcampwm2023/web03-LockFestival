import { ChatMessageDto } from '@chat/dtos/chat.message.dto';

export class EnteredChatMessageRequestDto {
  messages: ChatMessageDto[];
  cursorLogId: string;

  constructor(cursorLogId: string, messages: ChatMessageDto[]) {
    this.messages = messages;
    this.cursorLogId = cursorLogId;
  }
}
