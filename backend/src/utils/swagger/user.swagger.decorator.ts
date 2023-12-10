import { UnauthorizedException, applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserProfileDto } from '@user/dtos/user.profile.dto';
import { UserInfoResponseDto } from '@user/dtos/userInfo.response.dto';
import { UsersRoomsResponseDto } from '@user/dtos/users.rooms.response.dto';

export const GetUserProfileSwagger = () => {
  return applyDecorators(
    ApiBearerAuth('Authorization'),
    ApiOperation({
      summary: '유저 프로필 반환',
      description: '상단바에 표기될 로그인된 회원 프로필 정보를 조회합니다.',
    }),
    ApiOkResponse({
      status: 200,
      type: UserProfileDto,
    }),
    ApiUnauthorizedResponse({ description: '유효하지 않은 토큰', type: UnauthorizedException })
  );
};

export const CheckNicknameSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '닉네임 사용가능 여부 체크',
      description:
        '입력받은 닉네임의 유효성 검사 및 중복 체크를 진행하여 사용가능 여부를 반환합니다.',
    }),
    ApiOkResponse({ description: '사용 가능한 닉네임 여부', type: Boolean })
  );
};

export const FindGroupsByNicknameSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '채팅방 리스트 반환',
      description: '유저가 속한 채팅방 리스트를 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: UsersRoomsResponseDto,
    }),
    ApiBearerAuth('Authorization')
  );
};

export const UpdateUserInfoSwagger = () => {
  return applyDecorators(
    ApiBearerAuth('Authorization'),
    ApiOperation({
      summary: '유저 프로필 변경',
      description:
        '유저의 프로필 정보를 변경합니다.(회원 가입 후 최초 로그인 시 무조건 수행해야함).',
    }),
    ApiOkResponse({
      status: 200,
      description: '변경된 정보로 새로운 토큰과 정보를 반환합니다. ',
      type: UserInfoResponseDto,
    }),
    ApiBadRequestResponse({
      status: 400,
      description: '중복된 닉네임이 들어온 경우 (응답 ex. 중복된 닉네임 입니다.)',
      type: String,
    }),
    ApiUnauthorizedResponse({ description: '유효하지 않은 토큰', type: UnauthorizedException })
  );
};
