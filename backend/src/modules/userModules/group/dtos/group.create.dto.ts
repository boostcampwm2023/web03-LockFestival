import { Type } from 'class-transformer';
import { IsBoolean, IsString, IsNumber, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupRequestDto {
  @ApiProperty({ description: '모집 인원', example: 4 })
  @Type(() => {
    return Number;
  })
  @IsNumber()
  recruitmentMembers: number;

  @ApiProperty({
    description: '모집 내용',
    example: '(테마 변경 가능)11월 5일 오후 5시에 갈사람 구해요. ',
  })
  @IsString()
  recruitmentContent: string;

  @ApiProperty({ description: '예약 완료 여부', example: false })
  @Type(() => {
    return Boolean;
  })
  @IsBoolean()
  appointmentCompleted: boolean;

  @ApiProperty({ description: '예약 날짜' })
  @Type(() => {
    return Date;
  })
  @IsDate()
  appointmentDate: Date;

  @ApiProperty({ description: '모집하는 테마의 테마 id', example: 1 })
  @Type(() => {
    return Number;
  })
  @IsNumber()
  themeId: number;
}
