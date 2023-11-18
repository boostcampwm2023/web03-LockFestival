import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TokenAuthGuard } from '@src/modules/authModules/auth/auth.guard';
import { UserService } from '@user/user.service';
import { UserProfileDto } from './dtos/user.profile.dto';

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
}
