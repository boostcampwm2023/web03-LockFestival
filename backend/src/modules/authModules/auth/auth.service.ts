import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { PayloadDto } from '@auth/dtos/payload.dto';
import { UserNaverDto } from '@user/dtos/user.naver.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
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

  async getNaverAccessToken(code: string): Promise<string> {
    const url = 'https://nid.naver.com/oauth2.0/token';
    const clientId = this.configService.get('NAVER_CLIENT_ID');
    const clientSecret = this.configService.get('NAVER_CLIENT_SECRET');

    try {
      return (
        await this.httpService.axiosRef.post(
          url,
          {},
          {
            params: {
              grant_type: 'authorization_code',
              client_id: clientId,
              client_secret: clientSecret,
              code: code,
            },
            headers: { 'X-Naver-Client-Id': clientId, 'X-Naver-Client-Secret': clientSecret },
          }
        )
      ).data.access_token;
    } catch (error) {
      throw new HttpException('Failed to get Naver access token', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNaverUser(accessNaverToken: string): Promise<UserNaverDto> {
    try {
      return new UserNaverDto(
        (
          await this.httpService.axiosRef.post(
            'https://openapi.naver.com/v1/nid/me',
            {},
            { headers: { Authorization: `Bearer ${accessNaverToken}` } }
          )
        ).data.response
      );
    } catch (error) {
      throw new HttpException('Failed to get Naver user data.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
