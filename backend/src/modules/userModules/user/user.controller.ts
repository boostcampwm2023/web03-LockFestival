import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { NicknameRequestDto } from '@user/dtos/nickname.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('check-nickname/:nickname')
  async checkNickname(@Param() nicknameRequestDto: NicknameRequestDto) {
    return await this.userService.checkUsableNickname(nicknameRequestDto.nickname);
  }
}
