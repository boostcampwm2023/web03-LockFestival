import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { UserGroupRepository } from '@user/userGroup.repository';
import { ThemeModule } from '@theme/theme.module';
import { ChatModule } from '@chat/chat.module';
import { RoomEventService } from '@user/room.event.service';
import { GroupModule } from '@group/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => {
      return AuthModule;
    }),
    ThemeModule,
    ChatModule,
    GroupModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserGroupRepository, RoomEventService],
  exports: [UserService, UserRepository, UserGroupRepository, RoomEventService],
})
export class UserModule {}
