import { Body, Controller, Param, Get, Req, UseGuards, Put, Patch } from '@nestjs/common';
import { TokenAuthGuard } from '@auth/auth.guard';
import { UserService } from '@user/user.service';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { NicknameRequestDto } from '@user/dtos/nickname.request.dto';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { AuthService } from '@auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('/profile')
  @UseGuards(TokenAuthGuard)
  async getUserProfile(@Req() { user }): Promise<UserProfileDto> {
    const userProfileDto: UserProfileDto = await this.userService.getUserProfileByNickname(
      user.nickname
    );
    return userProfileDto;
  }

  @Get('check-nickname/:nickname')
  async checkNickname(@Param() nicknameRequestDto: NicknameRequestDto) {
    return await this.userService.checkUsableNickname(nicknameRequestDto.nickname);
  }

  @UseGuards(TokenAuthGuard)
  @Patch('/user-info')
  async updateUserInfo(@Req() { user }, @Body() body: UserInfoRequestDto) {
    const { nickname, email } = await this.userService.updateUserInfo(user.nickname, body);

    return this.authService.getAccessToken({ nickname, username: email });
  }
}
