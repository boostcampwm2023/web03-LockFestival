import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { BranchService } from './branch.service';

const DEFAULT_THEME_COUNT = 10;

@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
  @Get(':branchId/themes')
  getThemesByBranchId(
    @Param('branchId', ParseIntPipe) branchId: number,
    @Query('count', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe) count: number
  ) {
    return this.branchService.getThemesByBranchId({ branchId, count });
  }
}
