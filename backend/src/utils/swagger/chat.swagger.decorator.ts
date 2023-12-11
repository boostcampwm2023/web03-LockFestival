import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const GetUnreadChatListByGroupIdSwagger = () => {
  return applyDecorators(
    ApiOperation({
      description: '채팅방 입장시 안읽은 메세지 리스트를 반환합니다.',
    }),
    ApiBadRequestResponse({
      description: '유저가 방에 없습니다.',
    }),
    ApiBearerAuth('Authorization')
  );
};
