import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const DEFAULT_COUNT = 10 as const;
const DEFAULT_PAGE = 1 as const;

export class PaginationDto {
  @Transform(({ value }) => {
    if (['0', '', 'undefined'].includes(value)) {
      return DEFAULT_PAGE;
    }
    return parseInt(value);
  })
  @IsNumber()
  @ApiProperty({ description: '페이지', default: DEFAULT_PAGE, required: false })
  page: number = DEFAULT_PAGE;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @ApiProperty({ description: '가져올 테마 개수', default: DEFAULT_COUNT, required: false })
  count: number = DEFAULT_COUNT;
}
