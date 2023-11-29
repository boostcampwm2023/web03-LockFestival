import { ApiProperty } from '@nestjs/swagger';
import { PaginationPageMetaDto } from '@src/dtos/pagination.page.meta.dto';
import { ThemeResponseDto } from '@theme/dtos/theme.response.dto';

export class ThemeLocationResponseDto {
  @ApiProperty({ description: '페이지네이션 메타 정보', type: PaginationPageMetaDto })
  _meta: PaginationPageMetaDto;
  @ApiProperty({ type: [ThemeResponseDto] })
  data: ThemeResponseDto[];
  constructor(restCount: number, nextPage: number, data: ThemeResponseDto[]) {
    this._meta = new PaginationPageMetaDto(restCount, nextPage);
    this.data = data;
  }
}
