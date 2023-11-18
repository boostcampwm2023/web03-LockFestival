import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@user/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check-nickname/:nickname')
  async checkNickname(@Param('nickname') nickname: string) {
    return await this.userService.checkUsableNickname(nickname);
  }
}
