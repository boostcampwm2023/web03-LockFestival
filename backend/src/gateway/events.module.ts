import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EventsGateway } from '@src/gateway/events.gateway';
import { ChatModule } from '@chat/chat.module';
import { GroupModule } from '@group/group.module';

@Module({
  imports: [ChatModule, JwtModule, GroupModule],
  providers: [EventsGateway],
})
export class EventsModule {}
