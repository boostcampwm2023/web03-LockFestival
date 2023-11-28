import { ApiProperty } from '@nestjs/swagger';

export class GroupFindDetailResponseDto {
  @ApiProperty({ description: '그룹 id', type: Number, example: 1 })
  groupId: number;
  @ApiProperty({ description: '약속 날짜', type: Date })
  appointmentDate: Date;
  @ApiProperty({ description: '약속 시간(타입 수정 필요)', type: Date })
  appointmentTime: Date;
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
  @ApiProperty({ description: '비밀방 여부', type: Boolean, example: false })
  hasPassword: boolean;
  @ApiProperty({ description: '유저가 해당 그룹에 이미 들어갔는지', type: Boolean, example: false })
  isEnter: boolean;

  constructor({
    groupId,
    appointmentDate,
    appointmentTime,
    currentMembers,
    recruitmentMembers,
    recruitmentCompleted,
    appointmentCompleted,
    recruitmentContent,
    hasPassword,
    isEnter,
  }) {
    this.groupId = groupId;
    this.appointmentDate = appointmentDate;
    this.appointmentTime = appointmentTime;
    this.currentMembers = currentMembers;
    this.recruitmentMembers = recruitmentMembers;
    this.recruitmentCompleted = recruitmentCompleted;
    this.appointmentCompleted = appointmentCompleted;
    this.recruitmentContent = recruitmentContent;
    this.hasPassword = hasPassword;
    this.isEnter = isEnter;
  }
}
