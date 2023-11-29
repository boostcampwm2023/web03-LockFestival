import { Injectable } from '@nestjs/common';
import { ChatRepository } from '@chat/chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
}
