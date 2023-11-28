import { ApiProperty } from '@nestjs/swagger';

export class GroupRequestDto {
  @ApiProperty({ description: '모집 인원', example: 4 })
  recruitmentMembers: number;
  @ApiProperty({
    description: '모집 내용',
    example: '(테마 변경 가능)11월 5일 오후 5시에 갈사람 구해요. ',
  })
  recruitmentContent: string;
  @ApiProperty({ description: '모집 완료 여부', example: false })
  recruitmentCompleted: boolean;
  @ApiProperty({ description: '예약 날짜' })
  appointmentDate: Date;
  @ApiProperty({ description: '모집하는 테마의 테마 id', example: 1 })
  themeId: number;
}
