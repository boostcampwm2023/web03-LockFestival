export interface GroupInfoCardProps {
  writer: {
    profileUrl: string;
    nickName: string;
  };
  theme: {
    themeUrl: string;
    themeTitle: string;
    zizum: string;
    date: Date;
    maxCount: number;
    curCount: number;
    isRevervation: boolean;
    isRecruitment: boolean;
    title: string;
    phone: string;
    address: string;
    personnel: string;
    playTime: number;
    genre: string;
  };
  etc: {
    groupId: string;
    isEnter: boolean;
    isLock: boolean;
  };
}
