import { Injectable } from '@nestjs/common';
import { ChatRepository } from '@chat/chat.repository';
import { ChatMessageDto } from '@chat/dtos/chat.message.dto';
import { ChatUnreadDto } from '@chat/dtos/chat.unread.dto';
import { ChatMessageResponseDto } from '@chat/dtos/chat.message.response.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async createMessgeByChat(chatMessageDto: ChatMessageDto): Promise<ChatMessageResponseDto> {
    return await this.chatRepository.createMessgeByChat(chatMessageDto);
  }
  async findMessagesByLogId(chatUnreadDto: ChatUnreadDto): Promise<ChatMessageResponseDto[]> {
    return await this.chatRepository.findMessagesByStartLogId(chatUnreadDto);
  }
}
