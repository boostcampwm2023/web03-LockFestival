import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';
import { User } from '@user/entities/user.entity';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { UserRepository } from '@user/user.repository';
import { UserGroupRepository } from '@user/userGroup.repository';
import { Theme } from '@theme/entities/theme.entity';
import { Genre } from '@theme/entities/genre.entity';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { UsersRoomsGroupDto } from '@user/dtos/users.rooms.group.dto';
import { ChatRepository } from '@chat/chat.repository';
import { UsersRoomsResponseDto } from '@user/dtos/uesrs.rooms.response.dto';
import { ChatMessage } from '@chat/entities/chat.message.schema';
import { ChatUser } from '@chat/entities/chat.user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository,
    @InjectRepository(UserGroupRepository)
    private readonly userGroupRepository: UserGroupRepository,
    private readonly chatRepository: ChatRepository
  ) {}

  async checkUsableNickname(nickname: string) {
    return !(await this.userRepository.existsByNickname(nickname));
  }

  async login(data: UserNaverDto): Promise<User> {
    try {
      const userData = await this.userRepository.findUserByEmail(data.id);
      if (!userData) {
        let nickname: string = this.generateRandomString();
        while (!(await this.checkUsableNickname(nickname))) {
          nickname = this.generateRandomString();
        }

        return await this.userRepository.createUserByNaver(data, nickname);
      }
      return userData;
    } catch (error) {
      throw new HttpException('Login failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserProfileByNickname(nickname: string): Promise<UserProfileDto> {
    return this.userRepository.findUserProfileByNickname(nickname);
  }

  async updateUserInfo(originNickname: string, dto: UserInfoRequestDto): Promise<User> {
    if (!(await this.checkUsableNickname(dto.nickname))) {
      throw new HttpException('중복된 닉네임 입니다.', HttpStatus.BAD_REQUEST);
    }
    try {
      // genres와 themes는 변화가 99.9% 없는 테이블들 이므로 transaction에 포함하지 않아도 괜찮음
      const genres: Genre[] = await this.genreRepository.findBy({ name: In(dto.favoriteGenres) });
      const themes: Theme[] = await this.themeRepository.findBy({ id: In(dto.favoriteThemes) });

      const updatedUser: User = await this.userRepository.updateUserInfo(
        originNickname,
        dto,
        genres,
        themes
      );

      await this.chatRepository.updateUserNickname(originNickname, dto.nickname);

      return updatedUser;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException('Update user info failed.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //made by ChatGPT
  private generateRandomString(length: number = 8): string {
    let characters: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // 한글 범위를 추가
    characters += String.fromCodePoint(
      ...Array.from({ length: 0xd7a3 - 0xac00 + 1 }, (_, i) => {
        return i + 0xac00;
      })
    );

    let result: string = '';
    for (let i: number = 0; i < length; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  async getGroupsByNickname(nickname: string): Promise<any> {
    const usersRoomsResponseDto: UsersRoomsGroupDto[] =
      await this.userGroupRepository.findGroupsByNickname(nickname);

    return await Promise.all(
      usersRoomsResponseDto.map(
        async (userRoom: UsersRoomsGroupDto): Promise<UsersRoomsResponseDto> => {
          const roomId: string = String(userRoom.groupId);

          const lastChat: ChatMessage = await this.chatRepository.findLastChatByRoomId(roomId);
          const userInRoom: ChatUser = await this.chatRepository.validateRoomAndGetChatUser(
            String(userRoom.groupId),
            String(nickname)
          );

          if (!userInRoom.last_chat_log_id) {
            return new UsersRoomsResponseDto({
              ...userRoom,
              lastChatMessage: lastChat.chat_message,
              lastChatTime: lastChat.chat_date,
              hasNewChat: false,
              newChatCount: 0,
            });
          }

          const unreadCount: number = await this.chatRepository.countChatInRoomBetweenLogIds(
            roomId,
            userInRoom.last_chat_log_id,
            lastChat._id
          );

          return new UsersRoomsResponseDto({
            ...userRoom,
            lastChatMessage: lastChat.chat_message,
            lastChatTime: lastChat.chat_date,
            hasNewChat: userInRoom.last_chat_log_id.toString() !== lastChat._id.toString(),
            newChatCount: unreadCount,
          });
        }
      )
    );
  }
}
