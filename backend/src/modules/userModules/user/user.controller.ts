import { Body, Controller, Get, Param, Patch, Query, Req, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from '@auth/auth.guard';
import { UserService } from '@user/user.service';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { NicknameRequestDto } from '@user/dtos/nickname.request.dto';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { AuthService } from '@auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserInfoResponseDto } from '@user/dtos/userInfo.response.dto';
import { GroupsPaginationCursorDto } from '@group/dtos/group.pagination.cursor.dto';
import { UsersRoomsResponseDto } from '@user/dtos/users.rooms.response.dto';
import {
  CheckNicknameSwagger,
  FindGroupsByNicknameSwagger,
  GetUserProfileSwagger,
  UpdateUserInfoSwagger,
} from '@utils/swagger/user.swagger.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('/profile')
  @UseGuards(TokenAuthGuard)
  @GetUserProfileSwagger()
  async getUserProfile(@Req() { user }): Promise<UserProfileDto> {
    const userProfileDto: UserProfileDto = await this.userService.getUserProfileByNickname(
      user.nickname
    );
    return userProfileDto;
  }

  @Get('check-nickname/:nickname')
  @CheckNicknameSwagger()
  async checkNickname(@Param() nicknameRequestDto: NicknameRequestDto) {
    return await this.userService.checkUsableNickname(nicknameRequestDto.nickname);
  }

  @UseGuards(TokenAuthGuard)
  @Patch('/user-info')
  @UpdateUserInfoSwagger()
  async updateUserInfo(
    @Req() { user },
    @Body() body: UserInfoRequestDto
  ): Promise<UserInfoResponseDto> {
    const updatedUser = await this.userService.updateUserInfo(user.nickname, body);

    const { token } = await this.authService.getAccessToken({
      nickname: updatedUser.nickname,
    });

    return new UserInfoResponseDto(
      token,
      updatedUser.nickname,
      updatedUser.profileImageUrl,
      updatedUser.isMoreInfo
    );
  }

  @UseGuards(TokenAuthGuard)
  @Get('/rooms')
  @FindGroupsByNicknameSwagger()
  async findGroupsByNickname(
    @Req() { user },
    @Query() paginationCursorDto: GroupsPaginationCursorDto
  ): Promise<UsersRoomsResponseDto> {
    return await this.userService.getGroupsByNickname(user.nickname, paginationCursorDto);
  }
}
