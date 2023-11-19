import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { UserRepository } from '@user/user.repository';
import { Theme } from '@theme/entities/theme.entity';
import { Genre } from '@theme/entities/genre.entity';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository
  ) {}

  async checkUsableNickname(nickname: string) {
    return !(await this.userRepository.existsByNickname(nickname));
  }

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

  async updateUserInfo(originNickname: string, dto: UserInfoRequestDto): Promise<void> {
    try {
      // genres와 themes는 변화가 99.9% 없는 테이블들 이므로 transaction에 포함하지 않아도 괜찮음
      const genres: Genre[] = await this.genreRepository.findBy({ name: In(dto.favoriteGenres) });
      const themes: Theme[] = await this.themeRepository.findBy({ id: In(dto.favoriteThemes) });

      await this.userRepository.updateUserInfo(originNickname, dto, genres, themes);
    } catch (error) {
      console.error(error);
      throw new HttpException('Update user info failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
