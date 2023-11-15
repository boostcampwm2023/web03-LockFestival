import { Controller, Get, Query } from '@nestjs/common';
import { ThemeService } from '@theme/theme.service';
import { GenreThemesResponseDto } from './dtos/genre.themes.response.dto';

@Controller('themes')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

  @Get('/random-genres')
  async getRandomGenresThemes(
    @Query('genreCount') genreCount: number = 3,
    @Query('themeCount') themeCount: number = 10
  ): Promise<GenreThemesResponseDto[]> {
    return await this.themeService.getRandomGenresThemes(genreCount, themeCount);
  }
}
