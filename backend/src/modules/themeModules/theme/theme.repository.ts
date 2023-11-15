import { Repository, DataSource } from 'typeorm';
import { Theme } from '@theme/entities/theme.entity';
import { Injectable } from '@nestjs/common';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

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
}
