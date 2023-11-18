import { Injectable } from '@nestjs/common';
import { UserRepository } from '@user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async checkUsableNickname(nickname: string) {
    return !(await this.userRepository.existsByNickname(nickname));
  }
}
