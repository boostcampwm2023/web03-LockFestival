import {
  Body,
  Controller,
  Param,
  Get,
  Req,
  UseGuards,
  Put,
  Patch,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenAuthGuard } from '@auth/auth.guard';
import { UserService } from '@user/user.service';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { NicknameRequestDto } from '@user/dtos/nickname.request.dto';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { AuthService } from '@auth/auth.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Get('/profile')
  @UseGuards(TokenAuthGuard)
  @ApiBearerAuth('Authorization')
  @ApiOperation({
    summary: '유저 프로필 반환',
    description: '상단바에 표기될 로그인된 회원 프로필 정보를 조회합니다.',
  })
  @ApiOkResponse({
    status: 200,
    type: UserProfileDto,
  })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 토큰', type: UnauthorizedException })
  async getUserProfile(@Req() { user }): Promise<UserProfileDto> {
    const userProfileDto: UserProfileDto = await this.userService.getUserProfileByNickname(
      user.nickname
    );
    return userProfileDto;
  }

  @Get('check-nickname/:nickname')
  @ApiOperation({
    summary: '닉네임 사용가능 여부 체크',
    description:
      '입력받은 닉네임의 유효성 검사 및 중복 체크를 진행하여 사용가능 여부를 반환합니다.',
  })
  @ApiOkResponse({ description: '사용 가능한 닉네임 여부', type: Boolean })
  async checkNickname(@Param() nicknameRequestDto: NicknameRequestDto) {
    return await this.userService.checkUsableNickname(nicknameRequestDto.nickname);
  }

  @UseGuards(TokenAuthGuard)
  @Patch('/user-info')
  @ApiBearerAuth('Authorization')
  @ApiOperation({
    summary: '유저 프로필 반환',
    description: '상단바에 표기될 로그인된 회원 프로필 정보를 조회합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description:
      '변경된 정보로 새로운 토큰을 반환합니다. ex)Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    type: String,
  })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 토큰', type: UnauthorizedException })
  async updateUserInfo(@Req() { user }, @Body() body: UserInfoRequestDto) {
    const { nickname, email } = await this.userService.updateUserInfo(user.nickname, body);

    return this.authService.getAccessToken({ nickname, username: email });
  }
}
