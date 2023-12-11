import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export const GetThemesByBranchIdSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '특정 지점의 테마 리스트 반환',
      description: '특정 지점의 테마 리스트를 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: [ThemeResponseDto],
    }),
    ApiQuery({ name: 'count', description: '테마 개수(기본값=10)', type: Number, required: false })
  );
};
