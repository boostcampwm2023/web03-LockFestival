import { Controller, Get } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  async getToken() {
    return await this.authService.getAccessToken({ username: 'test', nickname: 'test' });
  }
}
