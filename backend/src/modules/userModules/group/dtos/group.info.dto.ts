import { ApiProperty } from '@nestjs/swagger';

export class GroupInfoDto {
  @ApiProperty({ description: '약속 날짜', type: Date })
  appointmentDate: Date;

  @ApiProperty({ description: '현재 그룹 인원', type: Number, example: 2 })
  currentMembers: number;
  @ApiProperty({ description: '모집하는 그룹 최대 인원', type: Number, example: 4 })
  recruitmentMembers: number;
  @ApiProperty({ description: '모집 완료', type: Boolean, example: false })
  recruitmentCompleted: boolean;
  @ApiProperty({ description: '예약 완료', type: Boolean, example: false })
  appointmentCompleted: boolean;
  @ApiProperty({
    description: '모집 내용',
    type: String,
    example: '(테마 변경 가능)11월 5일 오후 5시에 갈사람 구해요.',
  })
  recruitmentContent: string;
  constructor({
    recruitmentContent,
    appointmentDate,
    recruitmentMembers,
    currentMembers,
    recruitmentCompleted,
    appointmentCompleted,
  }) {
    this.recruitmentContent = recruitmentContent;
    this.appointmentDate = appointmentDate;
    this.recruitmentMembers = recruitmentMembers;
    this.currentMembers = currentMembers;
    this.recruitmentCompleted = recruitmentCompleted;
    this.appointmentCompleted = appointmentCompleted;
  }
}
