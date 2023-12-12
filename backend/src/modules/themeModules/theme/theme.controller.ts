import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ThemeService } from '@theme/theme.service';
import { GenreThemesResponseDto } from '@theme/dtos/genre.themes.response.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';
import { GenreService } from '@theme/genre.service';
import { GenreDto } from '@theme/dtos/genre.dto';
import { ThemeLocationResponseDto } from '@theme/dtos/theme.location.response.dto';
import { ThemeSimpleSearchResponseDto } from '@theme/dtos/theme.simple.search.response.dto';
import { ThemeBranchThemesDetailsResponseDto } from '@theme/dtos/theme.branch.detail.response.dto';
import { ThemeSearchRequestDto } from '@theme/dtos/theme.serach.request.dto';
import { ThemeSearchResponseDto } from '@theme/dtos/theme.search.response.dto';
import { DateRequestDto } from '@theme/dtos/date.request.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { TimeTableDto } from '@crawlerUtils/dtos/timetable.response.dto';
import { MIN_TO_MILLI } from '@constants/time.converter';
import {
  GetGenresSwagger,
  GetGenreThemesSwagger,
  GetLocationThemesSwagger,
  GetRandomGenresThemesSwagger,
  GetSimpleThemesSwagger,
  GetThemeDetailsSwagger,
  GetThemesSwagger,
  GetTimeTableSwagger,
} from '@utils/swagger/theme.swagger.decorator';

const DEFAULT_THEME_COUNT = 10;
const TIMETABLE_TTL = MIN_TO_MILLI * 5;

@ApiTags('themes')
@Controller('themes')
export class ThemeController {
  constructor(
    private readonly themeService: ThemeService,
    private readonly genreService: GenreService
  ) {}

  @Get(':themeId/details')
  @GetThemeDetailsSwagger()
  async getThemeDetails(
    @Param('themeId', ParseIntPipe) themeId: number
  ): Promise<ThemeBranchThemesDetailsResponseDto> {
    return await this.themeService.getThemeDetailsById(themeId);
  }

  @Get('/random-genres')
  @GetRandomGenresThemesSwagger()
  async getRandomGenresThemes(
    @Query('genreCount', new DefaultValuePipe(3), ParseIntPipe) genreCount: number,
    @Query('themeCount', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe) themeCount: number
  ): Promise<GenreThemesResponseDto[]> {
    return await this.themeService.getRandomGenresThemes(genreCount, themeCount);
  }

  @Get('/location')
  @GetLocationThemesSwagger()
  async getLocationThemes(
    @Query() themeLocationDto: ThemeLocationDto
  ): Promise<ThemeLocationResponseDto> {
    return await this.themeService.getLocationThemes(themeLocationDto);
  }

  @Get('/genres/:genreId')
  @GetGenreThemesSwagger()
  async getGenreThemes(
    @Param('genreId', ParseIntPipe) genreId: number,
    @Query('count', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe) count: number
  ): Promise<Array<ThemeResponseDto>> {
    return await this.themeService.getGenreThemes(genreId, count);
  }

  @Get('/genres')
  @GetGenresSwagger()
  async getGenres(): Promise<GenreDto[]> {
    return await this.genreService.getAllGenres();
  }

  @Get('/simple-themes')
  @GetSimpleThemesSwagger()
  async getSimpleThemes(@Query('query') query: string): Promise<ThemeSimpleSearchResponseDto[]> {
    return await this.themeService.getSimpleThemesBySearch(query);
  }

  @Get('/')
  @GetThemesSwagger()
  async getThemes(
    @Query() themeSearchRequestDto: ThemeSearchRequestDto
  ): Promise<ThemeSearchResponseDto> {
    return await this.themeService.getThemesBySearch(themeSearchRequestDto);
  }

  @Get('/:themeId/timetable')
  @GetTimeTableSwagger()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(TIMETABLE_TTL)
  async getTimeTable(
    @Param('themeId', ParseIntPipe) themeId: number,
    @Query() { date }: DateRequestDto
  ): Promise<TimeTableDto[]> {
    return await this.themeService.getTimeTable(themeId, date);
  }
}
