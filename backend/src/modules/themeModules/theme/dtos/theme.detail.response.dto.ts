import { ApiProperty } from '@nestjs/swagger';
import { ThemeDeatailsWithoutBrandBranchDto } from '@theme/dtos/theme.detail.without.brandbranch.dto';

export class ThemeDeatailsResponseDto extends ThemeDeatailsWithoutBrandBranchDto {
  @ApiProperty({ example: '건대점 넥스트에디션' })
  brandBranchName: string;

  constructor(options: Partial<ThemeDeatailsResponseDto>) {
    super(options);
    this.brandBranchName = options.brandBranchName;
  }
}
