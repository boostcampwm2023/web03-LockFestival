import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class DateRequestDto {
  @ApiProperty({
    name: 'date',
    description: '날짜',
    example: new Date(),
  })
  @Type(() => {
    return Date;
  })
  @IsDate()
  date: Date;
}
