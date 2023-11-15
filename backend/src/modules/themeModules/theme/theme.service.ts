import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { GenreDto } from '@theme/dtos/genre.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { GenreThemesResponseDto } from '@theme/dtos/genre.themes.response.dto';
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository
  ) {}

  public async getRandomGenresThemes(
    genreCount: number = 3,
    themeCount: number = 10
  ): Promise<GenreThemesResponseDto[]> {
    const genreDtos: GenreDto[] = await this.genreRepository.getRandomGenreIds(genreCount);
    return await Promise.all(
      genreDtos.map(async (genreDto: GenreDto): Promise<GenreThemesResponseDto> => {
        const themeDtos = await this.themeRepository.getRandomThemesByGenre(
          genreDto.id,
          themeCount
        );
        return { genre: genreDto.name, themes: themeDtos };
      })
    );
  }
  public async getLocationThemes(themeLocationDto: ThemeLocationDto): Promise<ThemeResponseDto[]> {
    return await this.themeRepository.getThemesByBoundary(themeLocationDto);
  }
}
