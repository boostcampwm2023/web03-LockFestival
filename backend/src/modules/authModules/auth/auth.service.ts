import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dtos/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async getAccessToken(payload: PayloadDto): Promise<{ token: string }> {
    return {
      token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_TIME')}`,
      }),
    };
  }

  async getRefreshToken(payload: PayloadDto): Promise<{ token: string }> {
    return {
      token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_TIME')}`,
      }),
    };
  }
}
