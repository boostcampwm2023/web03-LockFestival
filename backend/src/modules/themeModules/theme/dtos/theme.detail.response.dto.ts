import { ApiProperty } from '@nestjs/swagger';
import { ThemeDetailsWithoutBrandBranchDto } from '@theme/dtos/theme.detail.without.brandbranch.dto';

export class ThemeDetailsResponseDto extends ThemeDetailsWithoutBrandBranchDto {
  @ApiProperty({ example: '건대점 넥스트에디션' })
  brandBranchName: string;
  @ApiProperty({ example: '서울' })
  bigRegion: string;
  @ApiProperty({ example: '건대' })
  smallRegion: string;

  constructor(options: Partial<ThemeDetailsResponseDto>) {
    super(options);
    this.brandBranchName = options.brandBranchName;
  }
}
