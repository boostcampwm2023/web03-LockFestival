import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class ThemeDeatailsResponseDto {
  name: string;
  brandBranchName: string;
  realGenre: string;
  themeId: number;
  posterImageUrl: string;
  difficulty: number;
  minMember: number;
  maxMember: number;
  playTime: number;
  phone: number;
  address: string;
  website: string;
  otherThemes: ThemeResponseDto[];
}
