import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { GenreDto } from '@theme/dtos/genre.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { GenreThemesResponseDto } from '@theme/dtos/genre.themes.response.dto';
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';
import { ThemeDeatailsResponseDto } from '@theme/dtos/theme.detail.response.dto';
import { ThemeSimpleSearchResponseDto } from '@theme/dtos/theme.simple.search.response.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository
  ) {}

  public async getThemeDetailsById(themeId: number): Promise<ThemeDeatailsResponseDto> {
    const [themeDeatailsResponseDto, sameBranchThemesDto] = await Promise.all([
      this.themeRepository.getThemeDetailsById(themeId),
      this.themeRepository.getSameBranchThemesById(themeId),
    ]);

    if (!themeDeatailsResponseDto) {
      throw new NotFoundException('Theme not found : themeId = ' + themeId.toString());
    }
    themeDeatailsResponseDto.otherThemes = sameBranchThemesDto;
    return themeDeatailsResponseDto;
  }

  public async getRandomGenresThemes(
    genreCount: number = 3,
    themeCount: number = 10
  ): Promise<GenreThemesResponseDto[]> {
    const genreDtos: GenreDto[] = await this.genreRepository.getRandomGenreIds(genreCount);
    return await Promise.all(
      genreDtos.map(async (genreDto: GenreDto): Promise<GenreThemesResponseDto> => {
        const themeDtos = await this.themeRepository.getRandomThemesByGenre(
          genreDto.genreId,
          themeCount
        );
        return { genreName: genreDto.genreName, themes: themeDtos };
      })
    );
  }
  public async getLocationThemes(themeLocationDto: ThemeLocationDto): Promise<ThemeResponseDto[]> {
    return await this.themeRepository.getThemesByBoundary(themeLocationDto);
  }

  public async getGenreThemes(genreId: number, count: number): Promise<Array<ThemeResponseDto>> {
    return await this.themeRepository.getThemesByGenre(genreId, count);
  }
  public async getSimpleThemesBySearch(query: string): Promise<ThemeSimpleSearchResponseDto[]> {
    return await this.themeRepository.getSimpleThemesBySearch(query);
  }
}
