import { ApiProperty } from '@nestjs/swagger';
import { ThemeDetailsWithoutBrandBranchDto } from '@theme/dtos/theme.detail.without.brandbranch.dto';

export class ThemeDetailsWithBranchNameResponseDto extends ThemeDetailsWithoutBrandBranchDto {
  @ApiProperty({ example: '넥스트에디션' })
  branchName: string;

  constructor(options: Partial<ThemeDetailsWithBranchNameResponseDto>) {
    super(options);
    this.branchName = options.branchName;
  }
}
