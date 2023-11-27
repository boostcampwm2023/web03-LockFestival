import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BranchService } from '@branch/branch.service';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

const DEFAULT_THEME_COUNT = 10;

@ApiTags('branches')
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get(':branchId/themes')
  @ApiOperation({
    summary: '특정 지점의 테마 리스트 반환',
    description: '특정 지점의 테마 리스트를 반환합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '',
    type: [ThemeResponseDto],
  })
  @ApiQuery({ name: 'count', description: '테마 개수(기본값=10)', type: Number, required: false })
  getThemesByBranchId(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Query('count', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe)
    count: number
  ): Promise<ThemeResponseDto[]> {
    return this.branchService.getThemesByBranchId({ branchId, count });
  }
}
