import { Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ThemeService } from '@theme/theme.service';
import { GenreThemesResponseDto } from '@theme/dtos/genre.themes.response.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { ThemeLocationDto } from '@theme/dtos/theme.location.dto';
import { ThemeDeatailsResponseDto } from '@theme/dtos/theme.detail.response.dto';
import { GenreService } from '@theme/genre.service';
import { GenreDto } from '@theme/dtos/genre.dto';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

const DEFAULT_THEME_COUNT = 10;

@ApiTags('themes')
@Controller('themes')
export class ThemeController {
  constructor(
    private readonly themeService: ThemeService,
    private readonly genreService: GenreService
  ) {}

  @Get(':themeId/details')
  @ApiOperation({
    summary: '특정 테마의 상세 정보 반환',
    description: '특정 테마의 상세 정보를 반환합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '',
    type: [ThemeDeatailsResponseDto],
  })
  async getThemeDetails(
    @Param('themeId', ParseIntPipe) themeId: number
  ): Promise<ThemeDeatailsResponseDto> {
    return await this.themeService.getThemeDetailsById(themeId);
  }

  @Get('/random-genres')
  @ApiOperation({
    summary: '랜덤한 장르의 테마들을 반환합니다.',
    description: '랜덤한 분류용 장르를 genreCount개 선택하여 각 themeCount개의 테마를 반환합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '',
    type: [GenreThemesResponseDto],
  })
  @ApiQuery({
    name: 'genreCount',
    required: false,
    description: '랜덤한 장르의 개수(기본값: 3)',
    type: Number,
  })
  @ApiQuery({
    name: 'themeCount',
    required: false,
    description: '특정 장르의 랜덤한 테마의 개수(기본값: 10)',
    type: Number,
  })
  async getRandomGenresThemes(
    @Query('genreCount', new DefaultValuePipe(3), ParseIntPipe) genreCount: number,
    @Query('themeCount', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe) themeCount: number
  ): Promise<GenreThemesResponseDto[]> {
    return await this.themeService.getRandomGenresThemes(genreCount, themeCount);
  }

  @Get('/location')
  @ApiOperation({
    summary: '위치 기반 매장 테마 반환',
    description:
      '현재 위치에서 위도(x), 경도(y) 값을 받아 boundary KM 이내의 테마들을 커서 기반 페이지네이션으로 반환합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '',
    type: [ThemeResponseDto],
  })
  async getLocationThemes(
    @Query() themeLocationDto: ThemeLocationDto
  ): Promise<ThemeResponseDto[]> {
    return await this.themeService.getLocationThemes(themeLocationDto);
  }

  @Get('/genres/:genreId')
  @ApiOperation({
    summary: '특정 (분류용) 장르의 테마 리스트 반환',
    description:
      '특정 (분류용) 장르의 테마 리스트를 반환합니다. count 값이 주어지면 해당 개수만큼 반환합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '',
    type: [ThemeResponseDto],
  })
  @ApiParam({
    description: '장르 id',
    name: 'genreId',
  })
  @ApiQuery({
    description: `가져올 테마 개수(기본값: ${DEFAULT_THEME_COUNT})`,
    name: 'count',
    required: false,
  })
  async getGenreThemes(
    @Param('genreId', ParseIntPipe) genreId: number,
    @Query('count', new DefaultValuePipe(DEFAULT_THEME_COUNT), ParseIntPipe) count: number
  ): Promise<Array<ThemeResponseDto>> {
    return await this.themeService.getGenreThemes(genreId, count);
  }

  @Get('/genres')
  @ApiOperation({
    summary: '분류 장르 리스트 반환',
    description: '분류용 장르를 모두 반환합니다.',
  })
  @ApiOkResponse({
    status: 200,
    description: '',
    type: [GenreDto],
  })
  async getGenres(): Promise<GenreDto[]> {
    return await this.genreService.getAllGenres();
  }
}
