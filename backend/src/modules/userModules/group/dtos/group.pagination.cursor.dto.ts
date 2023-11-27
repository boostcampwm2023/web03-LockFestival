import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Sort } from '@src/enum/sort.enum';

const DEFAULT_COUNT = 10 as const;

export class GroupsPaginationCursorDto {
  @IsOptional()
  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  cursorGroupId: number;

  // 기본값: true
  @Transform(({ value }) => {
    if (value === 'false') {
      return Sort.ASC;
    }
    return Sort.DESC;
  })
  @IsEnum(Sort)
  isDesc: Sort = Sort.DESC;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  count: number = DEFAULT_COUNT;
}
