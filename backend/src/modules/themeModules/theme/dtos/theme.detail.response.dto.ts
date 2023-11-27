import { ApiProperty } from '@nestjs/swagger';

export class ThemeDeatailsResponseDto {
  @ApiProperty({ example: 'SOUL CHASER - 실종' })
  name: string;
  @ApiProperty({ example: '건대점' })
  branchName: string;
  @ApiProperty({ example: '야외' })
  realGenre: string;
  @ApiProperty({ example: 'https://i.postimg.cc/nLwL9k0H/theme-SOUL-CHASER.jpg' })
  posterImageUrl: string;
  @ApiProperty({ example: '4.0' })
  difficulty: number;
  @ApiProperty({ example: 2 })
  minMember: number;
  @ApiProperty({ example: 2 })
  maxMember: number;
  @ApiProperty({ example: 'https://www.nextedition.co.kr/shops/NextEdition%20Gundae' })
  website: string;
}
