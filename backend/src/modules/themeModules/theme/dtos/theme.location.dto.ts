import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@src/dtos/pagination.dto';

const DEFAULT_BOUNDARY = 5 as const;

export class ThemeLocationDto extends PaginationDto {
  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsLatitude()
  @ApiProperty({ description: '위도', example: '37.48158005' })
  x: number;

  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsLongitude()
  @ApiProperty({ description: '경로', example: '126.97255197' })
  y: number;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @ApiProperty({ description: '바운더리 KM', default: DEFAULT_BOUNDARY, required: false })
  boundary: number = DEFAULT_BOUNDARY;
}
