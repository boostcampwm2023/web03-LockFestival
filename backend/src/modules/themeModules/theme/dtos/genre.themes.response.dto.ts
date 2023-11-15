import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class GenreThemesResponseDto {
  genre: string;
  themes: ThemeResponseDto[];
}
