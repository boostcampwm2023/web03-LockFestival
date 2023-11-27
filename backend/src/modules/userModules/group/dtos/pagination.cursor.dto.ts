import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

const DEFAULT_COUNT = 10 as const;

export class GroupsPaginationCursorDto {
  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  cursorGroupId: number;

  // 기본값: true
  @Transform(({ value }) => {
    if (value === 'false') {
      return false;
    }
    return true;
  })
  @IsBoolean()
  isDesc: boolean;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  count: number = DEFAULT_COUNT;
}
