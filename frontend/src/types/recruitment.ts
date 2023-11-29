export interface GroupInfoCardProps {
  leader: {
    nickname: string;
    profileImageUrl: string;
  };
  themeDetail: {
    themeName: string;
    realGenre: string;
    themeId: number;
    posterImageUrl: string;
    difficulty: number;
    minMember: number;
    maxMember: number;
    playTime: number;
    phone: string;
    address: string;
    website: string;
    branchName: string;
  };
  groupDetail: {
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
  };
}

export interface FetchRecruitmentByCursor {
  _meta: {
    restCount: number;
    nextCursor: number;
  };
  data: Array<GroupInfoCardProps>;
}
