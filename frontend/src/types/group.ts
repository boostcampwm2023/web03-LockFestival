export interface FetchGroupData {
  _meta: {
    restCount: number;
    nextCursor: number;
  };
  data: Array<GroupProps>;
}

export interface GroupProps {
  themeId: number;
  themeName: string;
  posterImageUrl: string;
  branchName: string;
  groupId: number;
  recruitmentContent: string;
  lastChatMessage: string;
  lastChatTime: string;
  hasNewChat: boolean;
  newChatCount: number;
}
