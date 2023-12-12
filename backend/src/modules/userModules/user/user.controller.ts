import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TokenAuthGuard } from '@auth/auth.guard';
import { UserService } from '@user/user.service';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { NicknameRequestDto } from '@user/dtos/nickname.request.dto';
import { UserInfoRequestDto } from '@user/dtos/userInfo.request.dto';
import { AuthService } from '@auth/auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserInfoResponseDto } from '@user/dtos/userInfo.response.dto';
import { GroupsPaginationCursorDto } from '@group/dtos/group.pagination.cursor.dto';
import { UsersRoomsResponseDto } from '@user/dtos/users.rooms.response.dto';
import { GroupService } from '@group/group.service';
import { RoomEventService } from '@user/room.event.service';
import { CacheTTL } from '@nestjs/cache-manager';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private groupService: GroupService,
    private roomEventService: RoomEventService
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
    summary: '유저 프로필 변경',
    description: '유저의 프로필 정보를 변경합니다.(회원 가입 후 최초 로그인 시 무조건 수행해야함).',
  })
  @ApiOkResponse({
    status: 200,
    description: '변경된 정보로 새로운 토큰과 정보를 반환합니다. ',
    type: UserInfoResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: '중복된 닉네임이 들어온 경우 (응답 ex. 중복된 닉네임 입니다.)',
    type: String,
  })
  @ApiUnauthorizedResponse({ description: '유효하지 않은 토큰', type: UnauthorizedException })
  async updateUserInfo(
    @Req() { user },
    @Body() body: UserInfoRequestDto
  ): Promise<UserInfoResponseDto> {
    const updatedUser = await this.userService.updateUserInfo(user.nickname, body);

    const { token } = await this.authService.getAccessToken({
      nickname: updatedUser.nickname,
    });

    return new UserInfoResponseDto(
      token,
      updatedUser.nickname,
      updatedUser.profileImageUrl,
      updatedUser.isMoreInfo
    );
  }

  @UseGuards(TokenAuthGuard)
  @Get('/rooms')
  @ApiOperation({
    summary: '채팅방 리스트 반환',
    description: '유저가 속한 채팅방 리스트를 반환합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '',
    type: UsersRoomsResponseDto,
  })
  @ApiBearerAuth('Authorization')
  async findGroupsByNickname(
    @Req() { user },
    @Query() paginationCursorDto: GroupsPaginationCursorDto
  ): Promise<UsersRoomsResponseDto> {
    return await this.userService.getGroupsByNickname(user.nickname, paginationCursorDto);
  }

  @CacheTTL(1)
  @UseGuards(TokenAuthGuard)
  @Get('/rooms/:roomId/subscribe')
  async subscribeGroupsByNickname(@Req() { user }, @Param('roomId', ParseIntPipe) roomId: number) {
    console.log('cached hi');
    if (!(await this.groupService.isUserInGroupByGroupIdAndNickname(roomId, user.nickname))) {
      throw new HttpException('해당 방에 참가자가 아닙니다.', HttpStatus.BAD_REQUEST);
    }

    const updatedData = await this.roomEventService.waitUpdate(roomId, user.nickname);
    return updatedData;
  }
}
