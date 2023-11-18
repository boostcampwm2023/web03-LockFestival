import { Injectable } from '@nestjs/common';
import { UserRepository } from '@user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async existsByNickname(nickname: string) {
    return this.userRepository.existsByNickname(nickname);
  }
}
