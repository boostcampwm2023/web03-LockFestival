import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class EnteredChatMessageRequestDto {
  @ApiProperty({
    type: [ChatMessageDto],
  })
  messages: ChatMessageDto[];
  @ApiProperty({
    description: '커서로 사용한 안읽은 chatLogId',
  })
  cursorLogId: string;

  constructor(cursorLogId: string, messages: ChatMessageDto[]) {
    this.messages = messages;
    this.cursorLogId = cursorLogId;
  }
}
