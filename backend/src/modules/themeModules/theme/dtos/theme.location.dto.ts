import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { Transform } from 'class-transformer';

const DEFAULT_BOUNDARY = 5 as const;
const DEFAULT_COUNT = 10 as const;

export class ThemeLocationDto {
  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsLatitude()
  x: number;

  @Transform(({ value }) => {
    return parseFloat(value);
  })
  @IsLongitude()
  y: number;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  count: number = DEFAULT_COUNT;

  @Transform(({ value }) => {
    return parseInt(value);
  })
  @IsNumber()
  boundary: number = DEFAULT_BOUNDARY;
}
