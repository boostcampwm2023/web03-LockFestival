import { PaginationDto } from '@src/dto/pagination.dto';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class GroupFindOptionsDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    return undefined;
  })
  @IsBoolean()
  recruitmentCompleted: boolean;
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') {
      return true;
    }
    if (value === 'false') {
      return false;
    }
    return undefined;
  })
  @IsBoolean()
  appointmentCompleted: boolean;
  @IsOptional()
  bigRegion: string;
  @IsOptional()
  smallRegion: string;
  @IsOptional()
  themeName: string;
}