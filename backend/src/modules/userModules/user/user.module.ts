import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { ThemeModule } from '@theme/theme.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => {
      return AuthModule;
    }),
    ThemeModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
