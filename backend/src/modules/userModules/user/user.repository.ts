import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@user/entities/user.entity';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
import { Gender } from '@enum/gender';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { Genre } from '@theme/entities/genre.entity';
import { Theme } from '@theme/entities/theme.entity';

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

  //transaction
  async updateUserInfo(
    originNickname: string,
    dto: UserInfoRequestDto,
    preferGenres: Genre[],
    preferThemes: Theme[]
  ): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();

      const user: User = await queryRunner.manager.findOneBy(User, { nickname: originNickname });

      const newUser: User = await queryRunner.manager.save(
        user.updateUserInfo(dto.nickname, dto.profileImageUrl, preferGenres, preferThemes)
      );

      await queryRunner.commitTransaction();

      return newUser;
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
