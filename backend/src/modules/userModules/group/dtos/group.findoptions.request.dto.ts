import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { GroupsPaginationCursorDto } from '@group/dtos/pagination.cursor.dto';

export class GroupFindOptionsDto extends GroupsPaginationCursorDto {
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
