import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GenreThemesResponseDto } from '@theme/dtos/genre.themes.response.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';
import { GenreDto } from '@theme/dtos/genre.dto';
import { ThemeLocationResponseDto } from '@theme/dtos/theme.location.response.dto';
import { ThemeSimpleSearchResponseDto } from '@theme/dtos/theme.simple.search.response.dto';
import { ThemeBranchThemesDetailsResponseDto } from '@theme/dtos/theme.branch.detail.response.dto';
import { ThemeSearchResponseDto } from '@theme/dtos/theme.search.response.dto';

const DEFAULT_THEME_COUNT = 10;
export const GetThemeDetailsSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '특정 테마의 상세 정보 반환',
      description: '특정 테마의 상세 정보를 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: ThemeBranchThemesDetailsResponseDto,
    })
  );
};
export const GetRandomGenresThemesSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '랜덤한 장르의 테마들을 반환합니다.',
      description:
        '랜덤한 분류용 장르를 genreCount개 선택하여 각 themeCount개의 테마를 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: [GenreThemesResponseDto],
    }),
    ApiQuery({
      name: 'genreCount',
      required: false,
      description: '랜덤한 장르의 개수(기본값: 3)',
      type: Number,
    }),
    ApiQuery({
      name: 'themeCount',
      required: false,
      description: '특정 장르의 랜덤한 테마의 개수(기본값: 10)',
      type: Number,
    })
  );
};
export const GetLocationThemesSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '위치 기반 매장 테마 반환',
      description:
        '현재 위치에서 위도(x), 경도(y) 값을 받아 boundary KM 이내의 테마들을 커서 기반 페이지네이션으로 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: ThemeLocationResponseDto,
    })
  );
};

export const GetGenreThemesSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '특정 (분류용) 장르의 테마 리스트 반환',
      description:
        '특정 (분류용) 장르의 테마 리스트를 반환합니다. count 값이 주어지면 해당 개수만큼 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: [ThemeResponseDto],
    }),
    ApiParam({
      description: '장르 id',
      name: 'genreId',
    }),
    ApiQuery({
      description: `가져올 테마 개수(기본값: ${DEFAULT_THEME_COUNT})`,
      name: 'count',
      required: false,
    })
  );
};

export const GetGenresSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '분류 장르 리스트 반환',
      description: '분류용 장르를 모두 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: [GenreDto],
    })
  );
};

export const GetSimpleThemesSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '검색 리스트 반환',
      description: '모집글 생성 시 검색한 테마 리스트를 10개 반환합니다',
    }),
    ApiQuery({
      description: '검색어',
      name: 'query',
      required: true,
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: [ThemeSimpleSearchResponseDto],
    })
  );
};

export const GetThemesSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '검색에 따른 테마 리스트 반환',
      description: '검색에 따른 테마리스트를 반환합니다.',
    }),
    ApiOkResponse({
      status: 200,
      description: '',
      type: ThemeSearchResponseDto,
    })
  );
};
export const GetTimeTableSwagger = () => {
  return applyDecorators(
    ApiOperation({
      summary: '테마 시간표를 반환',
      description: '입력받은 테마 id와 날짜로 시간표를 검색하여 반환합니다.',
    }),
    ApiQuery({
      name: 'date',
      type: Date,
      example: new Date(),
    })
  );
};
