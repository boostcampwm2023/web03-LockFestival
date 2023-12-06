import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeRepository } from '@theme/theme.repository';
import { GenreRepository } from '@theme/genre.repository';
import { GenreDto } from '@theme/dtos/genre.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { GenreThemesResponseDto } from '@theme/dtos/genre.themes.response.dto';
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';
import { ThemeLocationResponseDto } from '@theme/dtos/theme.location.response.dto';
import { ThemeSimpleSearchResponseDto } from '@theme/dtos/theme.simple.search.response.dto';
import { ThemeBranchThemesDetailsResponseDto } from '@theme/dtos/theme.branch.detail.response.dto';
import { ThemeSearchRequestDto } from '@theme/dtos/theme.serach.request.dto';
import { ThemeSearchResponseDto } from '@theme/dtos/theme.search.response.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeRepository)
    private readonly themeRepository: ThemeRepository,
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository
  ) {}

  public async getThemeDetailsById(themeId: number): Promise<ThemeBranchThemesDetailsResponseDto> {
    const [themeDetailsResponseDto, sameBranchThemesDto] = await Promise.all([
      this.themeRepository.getThemeDetailsById(themeId),
      this.themeRepository.getSameBranchThemesById(themeId),
    ]);

    if (!themeDetailsResponseDto) {
      throw new NotFoundException('Theme not found : themeId = ' + themeId.toString());
    }

    themeDetailsResponseDto.otherThemes = sameBranchThemesDto;
    return themeDetailsResponseDto;
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
  public async getLocationThemes(
    themeLocationDto: ThemeLocationDto
  ): Promise<ThemeLocationResponseDto> {
    const { count, themes } = await this.themeRepository.getThemesByBoundary(themeLocationDto);

    const restCount = Math.max(
      count - (themeLocationDto.page * themeLocationDto.count + themes.length),
      0
    );

    return new ThemeLocationResponseDto(
      restCount,
      restCount > 0 ? themeLocationDto.page + 1 : undefined,
      themes
    );
  }

  public async getGenreThemes(genreId: number, count: number): Promise<Array<ThemeResponseDto>> {
    return await this.themeRepository.getThemesByGenre(genreId, count);
  }
  public async getSimpleThemesBySearch(query: string): Promise<ThemeSimpleSearchResponseDto[]> {
    return await this.themeRepository.getSimpleThemesBySearch(query);
  }
  public async getThemesBySearch(
    themeSearchRequestDto: ThemeSearchRequestDto
  ): Promise<ThemeSearchResponseDto> {
    const [count, themes] = await this.themeRepository.getThemesBySearch(themeSearchRequestDto);

    const restCount = Math.max(
      count - (themeSearchRequestDto.page * themeSearchRequestDto.count + themes.length),
      0
    );

    return new ThemeSearchResponseDto(
      restCount,
      restCount > 0 ? themeSearchRequestDto.page + 1 : undefined,
      themes
    );
  }
}
