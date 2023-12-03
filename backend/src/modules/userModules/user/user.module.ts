import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { UserGroupRepository } from '@user/userGroup.repository';
import { ThemeModule } from '@theme/theme.module';
import { ChatModule } from '@chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => {
      return AuthModule;
    }),
    ThemeModule,
    ChatModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserGroupRepository],
  exports: [UserService, UserRepository, UserGroupRepository],
})
export class UserModule {}
