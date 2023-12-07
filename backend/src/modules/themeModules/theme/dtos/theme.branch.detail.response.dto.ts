import { ApiProperty } from '@nestjs/swagger';
import { ThemeDetailsResponseDto } from '@theme/dtos/theme.detail.response.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class ThemeBranchThemesDetailsResponseDto extends ThemeDetailsResponseDto {
  @ApiProperty({ type: [ThemeResponseDto] })
  otherThemes: ThemeResponseDto[];
}
