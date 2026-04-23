import { Test, TestingModule } from '@nestjs/testing';
import { ThemeRepository } from '@theme/theme.repository';
import { DataSource } from 'typeorm';
import { Theme } from '@theme/entities/theme.entity';
import { Branch } from '@branch/entities/branch.entity';
import { Brand } from '@brand/entities/brand.entity';
import { themeBranchThemesDetailsResponseDto } from '@mocks/theme/common.mocks';

describe('ThemeRepository', () => {
  let themeRepository: ThemeRepository;

  const mockQueryBuilder = {
    innerJoin: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    getRawOne: jest.fn(),
  };

  const dataSource = {
    createEntityManager: jest.fn(),
    createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThemeRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    themeRepository = module.get<ThemeRepository>(ThemeRepository);
  });

  describe('getThemeDetailsById(themeId: number): Promise<ThemeBranchThemesDetailsResponseDto>', () => {
    test('테마 id를 입력받아 테마 정보를 반환한다.', async () => {
      //give
      const themeId: number = 1;
      mockQueryBuilder.getRawOne.mockImplementationOnce(() => {
        return themeBranchThemesDetailsResponseDto;
      });

      //when

      //then
      await expect(themeRepository.getThemeDetailsById(themeId)).resolves.toEqual(
        themeBranchThemesDetailsResponseDto
      );
      expect(dataSource.createQueryBuilder).toHaveBeenCalledTimes(1);
      expect(mockQueryBuilder.select).toHaveBeenCalledWith([
        'theme.name as themeName',
        'theme.id as themeId',
        'theme.real_genre as realGenre',
        'theme.poster_image_url as posterImageUrl',
        'theme.difficulty as difficulty',
        'theme.min_member as minMember',
        'theme.max_member as maxMember',
        'theme.time_limit as playTime',
        'branch.big_region as bigRegion',
        'branch.small_region as smallRegion',
        'branch.website as website',
        'branch.phone_number as phone',
        'branch.address as address',
        "CONCAT(brand.brand_name, ' ', branch.branch_name) AS brandBranchName",
      ]);
      expect(mockQueryBuilder.from).toHaveBeenCalledWith(Theme, 'theme');
      expect(mockQueryBuilder.innerJoin).toHaveBeenCalledWith(
        Branch,
        'branch',
        'theme.branch_id = branch.id'
      );
      expect(mockQueryBuilder.innerJoin).toHaveBeenCalledWith(
        Brand,
        'brand',
        'branch.brand_id = brand.id'
      );
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('theme.id = :themeId', { themeId });
      expect(dataSource.createQueryBuilder().innerJoin).toHaveBeenCalledTimes(2);
    });
  });
});
