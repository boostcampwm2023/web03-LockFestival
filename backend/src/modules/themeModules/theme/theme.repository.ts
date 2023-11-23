import { Repository, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Branch } from '@branch/entities/branch.entity';
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
        'branch.branch_name as branchName',
        'theme.real_genre as realGenre',
        'theme.poster_image_url as posterImageUrl',
        'theme.difficulty as difficulty',
        'theme.min_member as minMember',
        'theme.max_member as maxMember',
        'branch.website as website',
      ])
      .from(Theme, 'theme')
      .innerJoin(Branch, 'branch', 'theme.branch_id = branch.id')
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
}
