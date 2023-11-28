import { ApiProperty } from '@nestjs/swagger';
import { ThemeDeatailsResponseDto } from '@theme/dtos/theme.detail.response.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class ThemeBranchThemesDeatailsResponseDto extends ThemeDeatailsResponseDto {
  @ApiProperty({ type: [ThemeResponseDto] })
  otherThemes: ThemeResponseDto[];
}
