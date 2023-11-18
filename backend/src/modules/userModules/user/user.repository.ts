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

  async userSave(data: UserNaverDto): Promise<User> {
    const mappedGender = data.gender === 'M' ? Gender.M : Gender.F;
    return await this.save({
      gender: mappedGender,
      email: data.email,
      nickname: data.id.slice(1, data.id.length / 4),
      phoneNumber: data.mobile,
      name: data.name,
      birthYear: Number(data.birthyear),
      isMoreInfo: false,
    });
  }
  async findUserData(email: string) {
    return await this.findOneBy({ email });
  }
}
