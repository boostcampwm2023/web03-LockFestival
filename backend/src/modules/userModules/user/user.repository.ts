import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@user/entities/user.entity';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
import { Gender } from '@enum/gender';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUserByNaver(data: UserNaverDto): Promise<User> {
    return await this.save({
      gender: Gender[data.gender],
      email: data.email,
      nickname: data.id.slice(0, 8),
      phoneNumber: data.mobile,
      name: data.name,
      birthYear: Number(data.birthyear),
    });
  }
  async findUserByEmail(email: string) {
    return await this.findOneBy({ email });
  }
}
