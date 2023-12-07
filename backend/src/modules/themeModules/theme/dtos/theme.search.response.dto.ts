import { ApiProperty } from '@nestjs/swagger';
import { PaginationPageMetaDto } from '@src/dtos/pagination.page.meta.dto';
import { ThemeDetailsResponseDto } from '@theme/dtos/theme.detail.response.dto';

export class ThemeSearchResponseDto {
  @ApiProperty({ description: '페이지네이션 메타 정보', type: PaginationPageMetaDto })
  _meta: PaginationPageMetaDto;
  @ApiProperty({ type: [ThemeDetailsResponseDto] })
  data: ThemeDetailsResponseDto[];
  constructor(restCount: number, nextPage: number, data: ThemeDetailsResponseDto[]) {
    this._meta = new PaginationPageMetaDto(restCount, nextPage);
    this.data = data;
  }
}
