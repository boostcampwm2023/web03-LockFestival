import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { GroupRequestDto } from '@group/dtos/group.create.dto';
import { GroupsResponseDto } from '@group/dtos/groups.response.dto';

export const EnterGroupSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '그룹에 해당 유저 추가',
      description: '그룹에 로그인한 현재 유저를 추가하고 채팅방에 추가해줍니다.',
    }),
    ApiParam({
      name: 'groupId',
      description: '입장하고자하는 그룹의 groupId',
    }),
    ApiOkResponse({
      type: Boolean,
    }),
    ApiBearerAuth('Authorization')
  );
};

export const ExitGroupSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '해당 그룹에서 나가기 ',
      description: '그룹과 채팅방을 삭제합니다.',
    }),
    ApiParam({
      name: 'groupId',
      description: '나가고자 하는 그룹의 groupId',
    }),
    ApiBearerAuth('Authorization')
  );
};

export const GetAllGroupsSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '그룹 리스트 조회(검색)',
      description:
        '입력받은 조건을 기준으로 그룹 리스트를 반환합니다. 로그인한 사용자에게는 그룹에 속하는지에 대한 정보도 추가로 제공합니다.(Authentication: Optional)',
    }),
    ApiOkResponse({
      type: GroupsResponseDto,
    }),
    ApiBearerAuth('Authorization')
  );
};

export const CreateGroupSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '새로운 그룹 생성',
      description: '입력받은 데이터를 기반으로 새로운 그룹을 생성합니다.',
    }),
    ApiOkResponse({
      status: 200,
    }),
    ApiInternalServerErrorResponse({
      status: 500,
    }),
    ApiBearerAuth('Authorization'),
    ApiBody({ type: GroupRequestDto })
  );
};
