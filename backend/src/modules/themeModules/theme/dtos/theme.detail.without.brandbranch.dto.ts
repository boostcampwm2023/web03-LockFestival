import { ApiProperty } from '@nestjs/swagger';

export class ThemeDeatailsWithoutBrandBranchDto {
  @ApiProperty({ example: 'SOUL CHASER - 실종' })
  themeName: string;
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

  constructor({
    themeName,
    realGenre,
    themeId,
    posterImageUrl,
    difficulty,
    minMember,
    maxMember,
    playTime,
    phone,
    address,
    website,
  }: Partial<ThemeDeatailsWithoutBrandBranchDto>) {
    this.themeName = themeName;
    this.realGenre = realGenre;
    this.themeId = themeId;
    this.posterImageUrl = posterImageUrl;
    this.difficulty = difficulty;
    this.minMember = minMember;
    this.maxMember = maxMember;
    this.playTime = playTime;
    this.phone = phone;
    this.address = address;
    this.website = website;
  }
}
