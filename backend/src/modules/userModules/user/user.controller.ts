import { Body, Controller, Param, Get, Req, UseGuards, Put } from '@nestjs/common';
import { TokenAuthGuard } from '@auth/auth.guard';
import { UserService } from '@user/user.service';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { NicknameRequestDto } from '@user/dtos/nickname.request.dto';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
  @Put('/user-info')
  async updateUserInfo(@Req() { user }, @Body() body: UserInfoRequestDto) {
    this.userService.updateUserInfo(user.nickname, body);
    return;
  }
}
