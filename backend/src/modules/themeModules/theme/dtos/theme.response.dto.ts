import { ApiProperty } from '@nestjs/swagger';

export class ThemeResponseDto {
  @ApiProperty({
    name: 'posterImageUrl',
    description: '테마 포스터 이미지 URL',
    example: 'https://i.postimg.cc/nLwL9k0H/theme-SOUL-CHASER.jpg',
  })
  posterImageUrl?: string;
  @ApiProperty({ name: 'themeName', description: '테마명', example: 'SOUL CHASER - 실종' })
  themeName: string;
  @ApiProperty({ name: 'themeId', description: '테마 id', example: 1 })
  themeId: number;

  constructor({ posterImageUrl, name, id }) {
    this.posterImageUrl = posterImageUrl;
    this.themeName = name;
    this.themeId = id;
  }
}
