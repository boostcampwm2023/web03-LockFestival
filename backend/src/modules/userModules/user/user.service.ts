import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '@user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
import { User } from '@user/entities/user.entity';
import { UserProfileDto } from './dtos/user.profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async login(data: UserNaverDto): Promise<User> {
    try {
      const userData = await this.userRepository.findUserByEmail(data.email);
      if (!userData) {
        return await this.userRepository.createUserByNaver(data);
      }
      return userData;
    } catch (error) {
      throw new HttpException('Login failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserProfileByNickname(nickname: string): Promise<UserProfileDto> {
    return this.userRepository.findUserProfileByNickname(nickname);
  }
}
