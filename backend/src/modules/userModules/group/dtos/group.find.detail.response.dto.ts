export class GroupFindDetailResponseDto {
  groupId: number;
  appointmentDate: Date;
  appointmentTime: Date;
  currentMembers: number;
  recruitmentMembers: number;
  recruitmentCompleted: boolean;
  appointmentCompleted: boolean;
  recruitmentContent: string;
  hasPassword: boolean;
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
