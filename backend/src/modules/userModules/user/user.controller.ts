import { Controller, Param, Get, Req, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from '@src/modules/authModules/auth/auth.guard';
import { UserService } from '@user/user.service';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { NicknameRequestDto } from '@user/dtos/nickname.request.dto';

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
}
