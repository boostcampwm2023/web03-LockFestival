import { GroupFindDetailResponseDto } from '@group/dtos/group.find.detail.response.dto';
import { GroupLeaderDto } from '@group/dtos/group.leader.dto';
import { GroupThemeDetailDto } from '@group/dtos/group.theme.detail.dto';

export class GroupFindResponseDto {
  leader: GroupLeaderDto;
  themeDetail: GroupThemeDetailDto;
  groupDetail: GroupFindDetailResponseDto;

  constructor({
    nickname,
    profileImageUrl,
    brandBranchName,
    themeName,
    posterImageUrl,
    themeAddress,
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
    this.leader = new GroupLeaderDto({ nickname, profileImageUrl });
    this.themeDetail = new GroupThemeDetailDto({
      brandBranchName,
      themeName,
      posterImageUrl,
      themeAddress,
    });
    this.groupDetail = new GroupFindDetailResponseDto({
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
    });
  }
}
