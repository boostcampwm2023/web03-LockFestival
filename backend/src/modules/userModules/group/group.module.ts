import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from '@group/entities/group.entity';
import { GroupController } from '@group/group.controller';
import { GroupService } from '@group/group.service';
import { GroupRepository } from '@group/group.repository';
import { UserModule } from '@user/user.module';
import { ThemeModule } from '@theme/theme.module';
import { ChatModule } from '@chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    UserModule,
    ThemeModule,
    forwardRef(() => {
      return ChatModule;
    }),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
  exports: [GroupRepository],
})
export class GroupModule {}
