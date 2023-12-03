import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@src/dtos/pagination.dto';

export class ThemeSearchRequestDto extends PaginationDto {
  @ApiProperty({ description: '검색할 테마명' })
  query: string;
}
