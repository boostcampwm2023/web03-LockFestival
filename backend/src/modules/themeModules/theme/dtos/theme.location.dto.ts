import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

const DEFAULT_BOUNDARY = 5 as const;
const DEFAULT_COUNT = 10 as const;

export class ThemeLocationDto {
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
  @ApiProperty({ description: '가져올 테마 개수', default: DEFAULT_COUNT, required: false })
  count: number = DEFAULT_COUNT;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  @ApiProperty({ description: '바운더리 KM', default: DEFAULT_BOUNDARY, required: false })
  boundary: number = DEFAULT_BOUNDARY;
}
