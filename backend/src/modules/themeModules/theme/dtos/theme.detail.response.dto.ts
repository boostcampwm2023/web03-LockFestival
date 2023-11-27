import { ApiProperty } from '@nestjs/swagger';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class ThemeDeatailsResponseDto {
  @ApiProperty({ example: 'SOUL CHASER - 실종' })
  name: string;
  @ApiProperty({ example: '건대점 넥스트에디션' })
  brandBranchName: string;
  @ApiProperty({ example: '야외' })
  realGenre: string;
  @ApiProperty({ example: 1 })
  themeId: number;
  @ApiProperty({ example: 'https://i.postimg.cc/nLwL9k0H/theme-SOUL-CHASER.jpg' })
  posterImageUrl: string;
  @ApiProperty({ example: '4.0' })
  difficulty: number;
  @ApiProperty({ example: 2 })
  minMember: number;
  @ApiProperty({ example: 2 })
  maxMember: number;
  @ApiProperty({ example: 90 })
  playTime: number;
  @ApiProperty({ example: '02-463-9967' })
  phone: string;
  @ApiProperty({ example: '서울특별시 광진구 자양동 17-5 B1' })
  address: string;
  @ApiProperty({ example: 'https://www.nextedition.co.kr/shops/NextEdition%20Gundae' })
  website: string;
  @ApiProperty({ type: [ThemeResponseDto] })
  otherThemes: ThemeResponseDto[];
}
