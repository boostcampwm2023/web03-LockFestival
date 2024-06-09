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
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';
import { ThemeSearchRequestDto } from '@theme/dtos/theme.serach.request.dto';

describe('ThemeService', () => {
  let themeService: ThemeService;
  let themeRepository: ThemeRepository;
  const mockThemeRepository = {
    getThemeDetailsById: jest.fn(),
    getSameBranchThemesById: jest.fn(),
    getThemesByBoundary: jest.fn,
    getThemesByGenre: jest.fn(),
    getSimpleThemesBySearch: jest.fn(),
    getThemesBySearch: jest.fn(),
    getThemeNameBranchNameBrandNameByThemeId: jest.fn(),
  };
  const timeTable = [
    {
      time: '10:30',
      possible: false,
    },
    {
      time: '11:45',
      possible: false,
    },
    {
      time: '13:00',
      possible: false,
    },
    {
      time: '14:15',
      possible: false,
    },
    {
      time: '15:30',
      possible: false,
    },
    {
      time: '16:45',
      possible: false,
    },
    {
      time: '18:00',
      possible: false,
    },
    {
      time: '19:15',
      possible: false,
    },
    {
      time: '20:30',
      possible: true,
    },
    {
      time: '21:45',
      possible: true,
    },
    {
      time: '23:00',
      possible: true,
    },
  ];
  const mockGenreRepository = {};
  const mockCrawlerFactory = {};
  const mockCacheManager = {
    get: () => {
      return timeTable;
    },
    set: () => {
      return jest.fn;
    },
  };
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
      jest
        .spyOn(themeRepository, 'getThemeDetailsById')
        .mockResolvedValue(themeBranchThemesDetailsResponseDto);
      jest.spyOn(themeRepository, 'getSameBranchThemesById').mockResolvedValue(sameBranchThemesDto);

      //when
      const result = await themeService.getThemeDetailsById(themeId);

      //then
      expect(result).toEqual(themeBranchThemesDetailsResponseDto);
      expect(themeRepository.getThemeDetailsById).toHaveBeenCalledTimes(1);
      expect(themeRepository.getSameBranchThemesById).toHaveBeenCalledTimes(1);
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

  describe('getRandomGenresThemes()', () => {
    test('장르에 해당하는 랜덤한 테마들을 반환한다.', async () => {
      const themeId: number = 1;
    });
  });

  describe('getLocationThemes(themeLocationDto: ThemeLocationDto): Promise<ThemeLocationResponseDto>', () => {
    test('위/경도, 범위를 입력받아 해당 범위 내의 테마를 반환한다.', async () => {
      //give
      const themeLocationDto: ThemeLocationDto = {
        x: 10,
        y: 10,
        boundary: 5,
        page: 0,
        count: 10,
      };
      const count = 10;
      const themes = [
        {
          themeId: 26,
          themeName: '극',
          posterImageUrl: 'https://www.lockfestival.com/image/26.jpg',
        },
        {
          themeId: 27,
          themeName: '씨프?? XX!!',
          posterImageUrl: 'https://www.lockfestival.com/image/27.png',
        },
        {
          themeId: 28,
          themeName: 'Tester',
          posterImageUrl: 'https://www.lockfestival.com/image/28.jpg',
        },
        {
          themeId: 29,
          themeName: 'LOVER',
          posterImageUrl: 'https://www.lockfestival.com/image/29.png',
        },
        {
          themeId: 30,
          themeName: '옛날옛날에',
          posterImageUrl: 'https://www.lockfestival.com/image/30.png',
        },
        {
          themeId: 7,
          themeName: '저니(JOURNEY)',
          posterImageUrl: 'https://www.lockfestival.com/image/7.jpg',
        },
        {
          themeId: 8,
          themeName: 'MEMORY - Episode 1',
          posterImageUrl: 'https://www.lockfestival.com/image/8.jpg',
        },
        {
          themeId: 9,
          themeName: '완전한사랑(리뉴얼)',
          posterImageUrl: 'https://www.lockfestival.com/image/9.jpg',
        },
        {
          themeId: 10,
          themeName: '흐린날',
          posterImageUrl: 'https://www.lockfestival.com/image/10.png',
        },
        {
          themeId: 11,
          themeName: '카르텔',
          posterImageUrl: 'https://www.lockfestival.com/image/11.png',
        },
      ];

      //when
      jest.spyOn(themeRepository, 'getThemesByBoundary').mockResolvedValue({ count, themes });
      //then
      const result = await themeService.getLocationThemes(themeLocationDto);

      expect(themeRepository.getThemesByBoundary).toHaveBeenCalledTimes(1);
      expect(result._meta).toEqual(expect.objectContaining({ restCount: 0, nextPage: undefined }));
      expect(result._meta).toEqual({ restCount: 0, nextPage: undefined });
      expect(result.data).toEqual(themes);
    });
  });

  describe('getGenreThemes(genreId: number, count: number): Promise<Array<ThemeResponseDto>>', () => {
    test('장르 id에 해당하는 테마를 number 개 반환한다.', () => {
      //give
      const genreId: number = 1;
      const count: number = 10;
      const themes: Array<ThemeResponseDto> = [
        {
          themeId: 1,
          themeName: 'SOUL CHASER - 실종',
          posterImageUrl: 'https://www.lockfestival.com/image/1.jpg',
        },
        {
          themeId: 9,
          themeName: '완전한사랑(리뉴얼)',
          posterImageUrl: 'https://www.lockfestival.com/image/9.jpg',
        },
        {
          themeId: 17,
          themeName: '커튼콜',
          posterImageUrl: 'https://www.lockfestival.com/image/17.jpg',
        },
        {
          themeId: 24,
          themeName: 'BANK RUPT',
          posterImageUrl: 'https://www.lockfestival.com/image/24.jpg',
        },
        {
          themeId: 39,
          themeName: '로렌시아 - 잠들어버린 섬',
          posterImageUrl: 'https://www.lockfestival.com/image/39.png',
        },
        {
          themeId: 47,
          themeName: '평범한 하루',
          posterImageUrl: 'https://www.lockfestival.com/image/47.jpg',
        },
        {
          themeId: 55,
          themeName: 'FILM BY STEVE',
          posterImageUrl: 'https://www.lockfestival.com/image/55.jpg',
        },
        {
          themeId: 62,
          themeName: '그카지말라캤자나',
          posterImageUrl: 'https://www.lockfestival.com/image/62.jpg',
        },
        {
          themeId: 70,
          themeName: '월야애담-영문병행표기',
          posterImageUrl: 'https://www.lockfestival.com/image/70.jpg',
        },
        {
          themeId: 78,
          themeName: 'Promesa Act1 만남',
          posterImageUrl: 'https://www.lockfestival.com/image/78.jpg',
        },
      ];
      //when
      jest.spyOn(themeRepository, 'getThemesByGenre').mockResolvedValue(themes);
      //then
      expect(themeRepository.getThemesByGenre(genreId, count)).resolves.toEqual(themes);
    });
  });

  describe('getSimpleThemesBySearch(query: string): Promise<ThemeSimpleSearchResponseDto[]>', () => {
    test('검색어에 해당하는 테마들의 간단한 정보들을 정렬한 순서대로 반환한다.', () => {
      //give
      const queryString = '이상';
      const simpleThemes = [
        {
          themeId: 40,
          themeName: '이상',
          posterImageUrl: 'https://www.lockfestival.com/image/40.png',
          branchName: '부평점',
        },
        {
          themeId: 239,
          themeName: '이상한나라',
          posterImageUrl: 'https://www.lockfestival.com/image/239.jpg',
          branchName: '프라임청주점',
        },
      ];
      //when
      jest.spyOn(themeRepository, 'getSimpleThemesBySearch').mockResolvedValue(simpleThemes);
      //then
      expect(themeRepository.getSimpleThemesBySearch(queryString)).resolves.toEqual(simpleThemes);
    });

    test('검색어에 해당하는 테마가 존재하지 않으면 빈 배열이 반환된다.', () => {
      //give
      const queryString = '없음';
      //when
      jest.spyOn(themeRepository, 'getSimpleThemesBySearch').mockResolvedValue([]);
      //then
      expect(themeRepository.getSimpleThemesBySearch(queryString)).resolves.toEqual([]);
    });
  });

  describe('getThemesBySearch(themeSearchRequestDto: ThemeSearchRequestDto): Promise<ThemeSearchResponseDto>', () => {
    test('검색어에 해당하는 테마들의 정보들을 페이지네이션 정보를 포함하여 정렬한 순서대로 반환한다.', () => {
      //give
      const requestDto: ThemeSearchRequestDto = {
        query: '이상',
        page: 1,
        count: 10,
      };

      const count = 2;
      const themes = [
        {
          themeName: '이상',
          themeId: 40,
          realGenre: '미스터리',
          posterImageUrl: 'https://www.lockfestival.com/image/40.png',
          difficulty: '4.0',
          minMember: 2,
          maxMember: 6,
          playTime: 60,
          bigRegion: '경기/인천',
          smallRegion: '인천',
          website: 'https://www.nextedition.co.kr/shops/NextEdition%20Bupyung',
          phone: '070-8865-5424',
          address: '인천광역시 부평구 부평문화로80번길 16 5층',
          brandBranchName: '넥스트에디션 부평점',
        },
        {
          themeName: '이상한나라',
          themeId: 239,
          realGenre: '판타지/추리',
          posterImageUrl: 'https://www.lockfestival.com/image/239.jpg',
          difficulty: '3.0',
          minMember: 2,
          maxMember: 6,
          playTime: 60,
          bigRegion: '충청',
          smallRegion: '청주',
          website: 'https://www.master-key.co.kr/booking/bk_detail?bid=24',
          phone: '070-8818-8000',
          address: '충청북도 청주시 상당구 상당로69번길 3 2F',
          brandBranchName: '마스터키 프라임청주점',
        },
      ];
      const result = {
        _meta: {
          restCount: 0,
        },
        data: themes,
      };

      //when
      jest.spyOn(themeRepository, 'getThemesBySearch').mockResolvedValue([count, themes]);

      //then
      expect(themeService.getThemesBySearch(requestDto)).resolves.toEqual(result);
    });
  });

  describe('getTimeTable(themeId: number, date: Date): Promise<TimeTableDto[]>', () => {
    test('테마id와 날짜를 입력받아 시간표를 반환한다.', () => {
      //give
      const themeId: number = 100;
      const date: Date = new Date();
      const themeInfo = {
        themeName: '안녕',
        brandName: '비밀의 화원',
        branchName: '동성로점',
      };

      //when
      jest
        .spyOn(themeRepository, 'getThemeNameBranchNameBrandNameByThemeId')
        .mockResolvedValue(themeInfo);

      //then
      expect(themeService.getTimeTable(themeId, date)).resolves.toEqual(timeTable);
    });
  });

  /*
  describe('calcRestCount(totalCount: number, paginationInfo: PaginationDto, themeCount: number): number ', () => {
    test('페이지네이션 중 앞으로 남은 아이템 개수를 반환한다.', () => {
      //give
      //when
      Reflect.get(themeService, 'calcRestCount')(100, { page: 1, count: 1 }, 1);
      ThemeService.prototype['calcRestCount'](100, { page: 1, count: 1 }, 1);
      expect(ThemeService.prototype['calcRestCount'](100, { page: 1, count: 1 }, 1)).toBe(98);

      //then
    });
  });
   */
});
