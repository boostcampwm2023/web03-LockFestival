import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@group/entities/group.entity';
import { GroupController } from '@group/group.controller';
import { GroupService } from '@group/group.service';
import { GroupRepository } from '@group/group.repository';
import { UserModule } from '@user/user.module';
import { ThemeModule } from '@theme/theme.module';
import { ChatModule } from '@chat/chat.module';
import { EventsModule } from '@src/gateway/events.module';
import { NaverAIUtils } from '@utils/naver.ai';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    forwardRef(() => {
      return UserModule;
    }),
    ThemeModule,
    forwardRef(() => {
      return ChatModule;
    }),
    EventsModule,
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, NaverAIUtils],
  exports: [GroupRepository, GroupService],
})
export class GroupModule {}
