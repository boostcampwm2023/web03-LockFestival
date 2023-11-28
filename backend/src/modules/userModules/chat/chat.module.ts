import { Module } from '@nestjs/common';
import { ChatController } from '@chat/chat.controller';
import { ChatService } from '@chat/chat.service';
import { ChatRepository } from '@chat/chat.repository';
import { GroupModule } from '@group/group.module';

@Module({
  imports: [GroupModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
})
export class ChatModule {}
