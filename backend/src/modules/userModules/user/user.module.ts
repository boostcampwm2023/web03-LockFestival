import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => {
      return AuthModule;
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, ThemeRepository, GenreRepository],
  exports: [UserService],
})
export class UserModule {}
