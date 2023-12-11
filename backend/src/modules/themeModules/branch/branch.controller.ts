import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BranchService } from '@branch/branch.service';
import { ApiTags } from '@nestjs/swagger';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { GetThemesByBranchIdSwagger } from '@utils/swagger/branch.swagger.decorator';

const DEFAULT_THEME_COUNT = 10;

@ApiTags('branches')
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get(':branchId/themes')
  @GetThemesByBranchIdSwagger()
  getThemesByBranchId(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Query('count', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe)
    count: number
  ): Promise<ThemeResponseDto[]> {
    return this.branchService.getThemesByBranchId({ branchId, count });
  }
}
