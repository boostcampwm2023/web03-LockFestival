import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { UserService } from '@user/user.service';
import { ApiTags } from '@nestjs/swagger';
import { GetLoginSwagger } from '@utils/swagger/auth.swagger.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Get('/login/naver')
  @GetLoginSwagger()
  async getLogin(@Query('code') code: string) {
    const accessToken = await this.authService.getNaverAccessToken(code);
    const naverUserData = await this.authService.getNaverUser(accessToken);
    const userData = await this.userService.login(naverUserData);
    return await this.authService.getAccessToken({
      nickname: userData.nickname,
    });
  }
}
