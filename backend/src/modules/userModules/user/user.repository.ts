import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@user/entities/user.entity';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
import { Gender } from '@enum/gender';
import { UserProfileDto } from '@user/dtos/user.profile.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    const user = await this.findOneBy({ nickname });

    return !!user;
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

  async findUserProfileByNickname(nickname: string): Promise<UserProfileDto> {
    return await this.findOne({
      select: ['nickname', 'profileImageUrl', 'isMoreInfo'],
      where: { nickname },
    });
  }
}
