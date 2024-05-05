import { Test } from '@nestjs/testing';
import { ThemeService } from '@theme/theme.service';
import { ThemeBranchThemesDetailsResponseDto } from '@theme/dtos/theme.branch.detail.response.dto';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { CrawlerFactory } from '@crawlerUtils/crawler.factory';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { NotFoundException } from '@nestjs/common';

describe('ThemeService', () => {
  let themeService: ThemeService;
  let themeRepository: ThemeRepository;
  const mockThemeRepository = {
    getThemeDetailsById: jest.fn(),
    getSameBranchThemesById: jest.fn(),
  };
  const mockGenreRepository = {};
  const mockCrawlerFactory = {};
  const mockCacheManager = {};

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ThemeService,
        {
          provide: getRepositoryToken(ThemeRepository),
          useValue: mockThemeRepository,
        },
        {
          provide: getRepositoryToken(GenreRepository),
          useValue: mockGenreRepository,
        },
        {
          provide: getRepositoryToken(GenreRepository),
          useValue: mockGenreRepository,
        },
        {
          provide: CrawlerFactory,
          useValue: mockCrawlerFactory,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    themeService = module.get<ThemeService>(ThemeService);
    themeRepository = module.get<ThemeRepository>(ThemeRepository);
  });

  describe('getThemeDetailsById(themeId: number)', () => {
    test('테마 id를 입력받아 테마 정보를 반환한다.', async () => {
      //give
      const themeId: number = 1;
      const themeBranchThemesDetailsResponseDto: ThemeBranchThemesDetailsResponseDto = {
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
      const sameBranchThemesDto: ThemeResponseDto[] = [
        {
          posterImageUrl: 'https://i.postimg.cc/nLwL9k0H/theme-SOUL-CHASER.jpg',
          themeName: 'SOUL CHASER - 실종',
          themeId: 1,
        },
      ];

      //when
      jest
        .spyOn(themeRepository, 'getThemeDetailsById')
        .mockResolvedValue(themeBranchThemesDetailsResponseDto);
      jest.spyOn(themeRepository, 'getSameBranchThemesById').mockResolvedValue(sameBranchThemesDto);

      //then
      expect(await themeService.getThemeDetailsById(themeId)).toEqual(
        themeBranchThemesDetailsResponseDto
      );
    });

    test('존재하지 않는 테마 id를 입력하면 에러를 반환한다.', async () => {
      //give
      const themeId: number = 10000;
      const failThemeBranchThemesDetailsResponseDto: ThemeBranchThemesDetailsResponseDto = null;
      const failSameBranchThemesDto: ThemeResponseDto[] = null;

      //when
      jest
        .spyOn(themeRepository, 'getThemeDetailsById')
        .mockResolvedValue(failThemeBranchThemesDetailsResponseDto);
      jest
        .spyOn(themeRepository, 'getSameBranchThemesById')
        .mockResolvedValue(failSameBranchThemesDto);

      //then
      await expect(themeService.getThemeDetailsById(themeId)).rejects.toThrow(
        'Theme not found : themeId = ' + themeId.toString()
      );
      await expect(themeService.getThemeDetailsById(themeId)).rejects.toBeInstanceOf(
        NotFoundException
      );
    });
  });
});
