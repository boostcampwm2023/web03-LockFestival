import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Branch } from '@branch/entities/branch.entity';
import { Brand } from '@brand/entities/brand.entity';
import { Theme } from '@theme/entities/theme.entity';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { ThemeDeatailsResponseDto } from '@theme/dtos/theme.detail.response.dto';

const KM = 1000;

@Injectable()
export class ThemeRepository extends Repository<Theme> {
  constructor(private dataSource: DataSource) {
    super(Theme, dataSource.createEntityManager());
  }

  async getThemeDetailsById(themeId: number): Promise<ThemeDeatailsResponseDto> {
    const themeDetailsResponseDto: ThemeDeatailsResponseDto = await this.dataSource
      .createQueryBuilder()
      .select([
        'theme.name as name',
        'theme.id as themeId',
        'theme.real_genre as realGenre',
        'theme.poster_image_url as posterImageUrl',
        'theme.difficulty as difficulty',
        'theme.min_member as minMember',
        'theme.max_member as maxMember',
        'theme.time_limit as playTime',
        'branch.website as website',
        'branch.phone_number as phone',
        'branch.address as address',
        "CONCAT(branch.branch_name, ' ', brand.brand_name) AS brandBranch",
      ])
      .from(Theme, 'theme')
      .innerJoin(Branch, 'branch', 'theme.branch_id = branch.id')
      .innerJoin(Brand, 'brand', 'branch.brand_id = brand.id')
      .where('theme.id = :themeId', { themeId })
      .getRawOne();
    return themeDetailsResponseDto;
  }

  async getRandomThemesByGenre(genreId: number, themeCount: number): Promise<ThemeResponseDto[]> {
    const themes: ThemeResponseDto[] = await this.dataSource
      .createQueryBuilder()
      .select([
        'theme.id as themeId',
        'theme.name as name',
        'theme.poster_image_url as posterImageUrl',
      ])
      .from(Theme, 'theme')
      .where('theme.genre_id = :genreId', { genreId })
      .orderBy('Rand()')
      .limit(themeCount)
      .getRawMany();

    return themes;
  }

  async getThemesByBoundary({ x, y, boundary, count }): Promise<ThemeResponseDto[]> {
    const themes: ThemeResponseDto[] = await this.dataSource
      .createQueryBuilder()
      .select([
        'theme.id as themeId',
        'theme.name as name',
        'theme.poster_image_url as posterImageUrl',
      ])
      .from(Theme, 'theme')
      .innerJoin('theme.branch', 'branch')
      .where('ST_Distance_Sphere(point(branch.y, branch.x), point(:y, :x)) <= :boundary', {
        x,
        y,
        boundary: boundary * KM,
      })
      .limit(count)
      .getRawMany();

    return themes;
  }

  async getThemesByGenre(genreId: number, count: number): Promise<Array<ThemeResponseDto>> {
    const themes: ThemeResponseDto[] = await this.dataSource
      .createQueryBuilder()
      .select([
        'theme.id as themeId',
        'theme.name as name',
        'theme.poster_image_url as posterImageUrl',
      ])
      .from(Theme, 'theme')
      .where('theme.genre_id = :genreId', { genreId })
      .limit(count)
      .getRawMany();

    return themes;
  }

  async getThemesByBranchId({ branchId, count }): Promise<ThemeResponseDto[]> {
    const themeDtos = await this.dataSource
      .createQueryBuilder()
      .select([
        'theme.id as themeId',
        'theme.name as name',
        'theme.poster_image_url as posterImageUrl',
      ])
      .from(Theme, 'theme')
      .where('theme.branch_id = :branchId', { branchId })
      .limit(count)
      .getRawMany();
    return themeDtos;
  }

  async getSameBranchThemesById(themeId: number, count: number = 5): Promise<ThemeResponseDto[]> {
    const themes: ThemeResponseDto[] = await this.dataSource
      .createQueryBuilder()
      .select([
        'theme.id as themeId',
        'theme.name as name',
        'theme.poster_image_url as posterImageUrl',
      ])
      .from(Theme, 'theme')
      .where('theme.branch_id = (SELECT branch_id FROM theme WHERE id = :themeId)', { themeId })
      .andWhere('theme.id<> :themeId', { themeId })
      .limit(count)
      .getRawMany();
    return themes;
  }
}
