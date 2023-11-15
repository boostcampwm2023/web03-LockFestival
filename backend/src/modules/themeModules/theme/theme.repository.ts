import { Repository, DataSource } from 'typeorm';
import { Theme } from '@theme/entities/theme.entity';
import { Injectable } from '@nestjs/common';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

const KM = 1000;

@Injectable()
export class ThemeRepository extends Repository<Theme> {
  constructor(private dataSource: DataSource) {
    super(Theme, dataSource.createEntityManager());
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
}
