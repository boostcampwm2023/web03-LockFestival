import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { UserService } from '@user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Get('/login/naver')
  async getLogin(@Query('code') code: string) {
    const accessToken = await this.authService.getNaverAccessToken(code);
    const naverUserData = await this.authService.getNaverUser(accessToken);
    const userData = await this.userService.login(naverUserData);
    return await this.authService.getAccessToken({
      username: userData.name,
      nickname: userData.nickname,
    });
  }
}
