import { ApiProperty } from '@nestjs/swagger';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class GenreThemesResponseDto {
  @ApiProperty({ example: '공포' })
  genreName: string;
  @ApiProperty({ type: [ThemeResponseDto] })
  themes: ThemeResponseDto[];
}
