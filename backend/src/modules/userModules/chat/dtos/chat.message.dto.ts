import { ChatType } from '@enum/chat.type';
import { ApiProperty } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({
    description: '채팅 id',
    type: String,
  })
  chatId: string;
  @ApiProperty({
    description: '채팅 내용',
    type: String,
  })
  message: string;
  @ApiProperty({
    description: '채팅 타입',
    type: ChatType,
  })
  type: ChatType;
  @ApiProperty({
    description: '채팅 날짜',
    type: Date,
  })
  time: Date;
  @ApiProperty({
    description: '채팅보낸 사람의 _id',
    type: String,
  })
  userId: string;

  constructor(chat) {
    this.chatId = chat._id.toString();
    this.message = chat.chat_message;
    this.type = chat.type;
    this.time = chat.chat_date;
    this.userId = chat.sender?.toString();
  }
}
