import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    const user = await this.findOneBy({ nickname });

    return !!user;
  }
}
