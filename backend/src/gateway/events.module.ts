import { Module, forwardRef, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EventsGateway } from '@src/gateway/events.gateway';
import { ChatModule } from '@chat/chat.module';
import { GroupModule } from '@group/group.module';

@Module({
  imports: [
    forwardRef(() => {
      return ChatModule;
    }),
    forwardRef(() => {
      return GroupModule;
    }),
    JwtModule,
  ],
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
