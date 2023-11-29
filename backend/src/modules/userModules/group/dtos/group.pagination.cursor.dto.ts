import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Sort } from '@src/enum/sort.enum';

const DEFAULT_COUNT = 10 as const;

export class GroupsPaginationCursorDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'undefined' || value === '0' || value === '') {
      return undefined;
    }
    return parseInt(value);
  })
  @IsNumber()
  @ApiProperty({ description: '커서로 사용될 group Id 필터', required: false, type: Number })
  cursorGroupId: number;

  // 기본값: true
  @Transform(({ value }) => {
    if (value === 'false') {
      return Sort.ASC;
    }
    return Sort.DESC;
  })
  @IsEnum(Sort)
  @ApiProperty({
    description: '정렬 방향이 DESC 인지',
    required: false,
    type: Boolean,
    default: true,
  })
  isDesc: Sort = Sort.DESC;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @ApiProperty({
    description: '반환할 개수',
    required: false,
    type: Number,
    default: DEFAULT_COUNT,
  })
  count: number = DEFAULT_COUNT;
}
