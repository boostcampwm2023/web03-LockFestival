export type TotalChatLog = Record<string, Map<string, ChatLog>>;

export interface ServerChatLog extends ChatLog {
  logId: string;
}
export interface ChatLog {
  message: string;
  userId: string;
  type: 'message' | 'in' | 'out' | 'kick';
  time: Date;
}

export interface UserInfo {
  userId: string;
  profileImg: string;
  nickname: string;
  isLeader: boolean;
  isLeave: boolean;
  isMe: boolean;
}

export interface RoomInfo {
  brandName: string;
  branchName: string;
  regionName: string; //CONCAT 필요
  themeName: string;
  themeId: number; //시간표 불러올 때 사용
  posterImageUrl: string;
  contents: string;
  appointmentDate: Date;
  recruitmentMembers: number;
  currentMembers: number;
  recruitmentCompleted: boolean;
  appointmentCompleted: boolean;
}
