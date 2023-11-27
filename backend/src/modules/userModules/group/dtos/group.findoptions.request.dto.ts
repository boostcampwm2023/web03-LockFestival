import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GroupsPaginationCursorDto } from '@group/dtos/group.pagination.cursor.dto';

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
  @ApiProperty({ description: '모집 완료 여부 필터', required: false, type: Boolean })
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
  @ApiProperty({ description: '예약 완료 여부 필터', required: false, type: Boolean })
  appointmentCompleted: boolean;

  @IsOptional()
  @ApiProperty({
    description: '지역 대분류 여부 필터',
    required: false,
    type: String,
    example: '서울',
  })
  bigRegion: string;
  @IsOptional()
  @ApiProperty({
    description: '지역 소분류 여부 필터',
    required: false,
    type: String,
    example: '강남',
  })
  smallRegion: string;

  @IsOptional()
  @ApiProperty({
    description: '테마명 필터',
    required: false,
    type: String,
    example: 'SOS',
  })
  themeName: string;
}
