import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ThemeService } from '@theme/theme.service';
import { GenreThemesResponseDto } from '@theme/dtos/genre.themes.response.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';

const DEFAULT_THEME_COUNT = 10;

@Controller('themes')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get('/random-genres')
  async getRandomGenresThemes(
    @Query('genreCount', new DefaultValuePipe(3), ParseIntPipe) genreCount: number,
    @Query('themeCount', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe) themeCount: number
  ): Promise<GenreThemesResponseDto[]> {
    return await this.themeService.getRandomGenresThemes(genreCount, themeCount);
  }
  @Get('/location')
  async getLocationThemes(@Query() themeLocation: ThemeLocationDto): Promise<ThemeResponseDto[]> {
    return await this.themeService.getLocationThemes(themeLocation);
  }

  @Get('/genres/:genreId')
  async getGenreThemes(
    @Param('genreId', ParseIntPipe) genreId: number,
    @Query('count', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe) count: number
  ): Promise<Array<ThemeResponseDto>> {
    return await this.themeService.getGenreThemes(genreId, count);
  }
}
