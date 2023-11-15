import { Repository, DataSource } from 'typeorm';
import { Theme } from '@theme/entities/theme.entity';
import { Injectable } from '@nestjs/common';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { Branch } from '@branch/entities/branch.entity';
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';

const KM = 1000;

@Injectable()
export class ThemeRepository extends Repository<Theme> {
  constructor(private dataSource: DataSource) {
    super(Theme, dataSource.createEntityManager());
  }

  async getRandomThemesByGenre(genreId: number, themeCount: number): Promise<ThemeResponseDto[]> {
    const themes: Theme[] = await this.dataSource
      .createQueryBuilder(Theme, 'theme')
      .where('theme.genre_id = :genreId', { genreId })
      .orderBy('Rand()')
      .limit(themeCount)
      .getMany();

    return themes.map(({ posterImageUrl, name, id }): ThemeResponseDto => {
      return new ThemeResponseDto({ posterImageUrl, name, id });
    });
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
}
