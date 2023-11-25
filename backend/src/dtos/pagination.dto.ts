import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

const DEFAULT_COUNT = 10 as const;
const DEFAULT_PAGE = 1 as const;

export class PaginationDto {
  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  page: number = DEFAULT_PAGE;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  count: number = DEFAULT_COUNT;
}
