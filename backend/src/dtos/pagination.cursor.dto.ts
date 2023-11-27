import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

const DEFAULT_COUNT = 10 as const;

export class CursorPaginationDto {
  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  cursorId: number;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  count: number = DEFAULT_COUNT;
}
