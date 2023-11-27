import { ApiProperty } from '@nestjs/swagger';

export class ThemeResponseDto {
  @ApiProperty({
    name: 'posterImageUrl',
    description: '테마 포스터 이미지 URL',
    example: 'https://www.keyescape.co.kr/file/theme_info/40_a.jpg',
  })
  posterImageUrl?: string;
  @ApiProperty({ name: 'name', description: '테마명', example: 'BACK TO THE SCENE+' })
  name: string;
  @ApiProperty({ name: 'themeId', description: '테마 id', example: 1 })
  themeId: number;

  constructor({ posterImageUrl, name, id }) {
    this.posterImageUrl = posterImageUrl;
    this.name = name;
    this.themeId = id;
  }
}
