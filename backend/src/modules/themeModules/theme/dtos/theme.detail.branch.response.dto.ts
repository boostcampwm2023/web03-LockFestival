import { ApiProperty } from '@nestjs/swagger';
import { ThemeDeatailsWithoutBrandBranchDto } from '@theme/dtos/theme.detail.without.brandbranch.dto';

export class ThemeDeatailsWithBranchNameResponseDto extends ThemeDeatailsWithoutBrandBranchDto {
  @ApiProperty({ example: '넥스트에디션' })
  branchName: string;

  constructor(options: Partial<ThemeDeatailsWithBranchNameResponseDto>) {
    super(options);
    this.branchName = options.branchName;
  }
}
