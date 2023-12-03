import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { UserService } from '@user/user.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Get('/login/naver')
  @ApiOperation({
    summary: '네이버 로그인',
    description: '입력된 token으로 네이버 로그인을 수행하고, 자체 accessToken을 발급합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFueWNhcjg1MTVAbmF2ZXIuY29tIiwibmlja25hbWUiOiLroIjslrTri4kiLCJpYXQiOjE3MDA2NzQxNjUsImV4cCI6MTcwMDY3NDE2NX0.ikBQbx6zqnX7D9wvvwg0j_H9BFNWKki1vWdPHdXUUxI',
  })
  async getLogin(@Query('code') code: string) {
    const accessToken = await this.authService.getNaverAccessToken(code);
    const naverUserData = await this.authService.getNaverUser(accessToken);
    const userData = await this.userService.login(naverUserData);
    return await this.authService.getAccessToken({
      nickname: userData.nickname,
    });
  }
}
