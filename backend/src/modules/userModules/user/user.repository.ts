import { Repository, DataSource } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '@user/entities/user.entity';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
import { Gender } from '@enum/gender';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { Genre } from '@theme/entities/genre.entity';
import { Theme } from '@theme/entities/theme.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    const user = await this.findOneBy({ nickname });

    return !!user;
  }

  async createUserByNaver(data: UserNaverDto, nickname: string): Promise<User> {
    return await this.save({
      gender: Gender.F,
      email: data.id,
      nickname: nickname,
      profileImageUrl: data.profileImageUrl,
      phoneNumber: '010-0000-0000',
      name: '이름',
      birthYear: 1998,
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
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
