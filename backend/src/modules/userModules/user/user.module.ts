import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/entities/user.entity';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';
import { UserController } from '@user/user.controller';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserRepository, ThemeRepository, GenreRepository],
  exports: [UserService],
})
export class UserModule {}
