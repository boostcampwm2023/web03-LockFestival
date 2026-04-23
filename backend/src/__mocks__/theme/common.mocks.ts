import { ThemeBranchThemesDetailsResponseDto } from '@theme/dtos/theme.branch.detail.response.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export const themeBranchThemesDetailsResponseDto: ThemeBranchThemesDetailsResponseDto = {
  themeName: 'SOUL CHASER - 실종',
  realGenre: '야외',
  themeId: 1,
  posterImageUrl: 'https://i.postimg.cc/nLwL9k0H/theme-SOUL-CHASER.jpg',
  difficulty: 4,
  minMember: 2,
  maxMember: 2,
  playTime: 90,
  phone: '02-463-9967',
  address: '서울특별시 광진구 자양동 17-5 B1',
  website: 'https://www.nextedition.co.kr/shops/NextEdition%20Gundae',
  brandBranchName: '건대점 넥스트에디션',
  bigRegion: '서울',
  smallRegion: '건대',
  otherThemes: undefined,
};

export const sameBranchThemesDto: ThemeResponseDto[] = [
  {
    posterImageUrl: 'https://i.postimg.cc/nLwL9k0H/theme-SOUL-CHASER.jpg',
    themeName: 'SOUL CHASER - 실종',
    themeId: 1,
  },
];
