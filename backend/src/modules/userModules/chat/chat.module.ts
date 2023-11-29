import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatController } from '@chat/chat.controller';
import { ChatService } from '@chat/chat.service';
import { ChatRepository } from '@chat/chat.repository';
import { GroupModule } from '@group/group.module';
import { Room, RoomSchema } from '@chat/entities/room.schema';
import { ChatUser, ChatUserSchema } from '@chat/entities/chat.user.schema';
import { ChatMessage, ChatMessageSchema } from '@chat/entities/chat.message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: ChatUser.name, schema: ChatUserSchema },
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
    GroupModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
})
export class ChatModule {}
