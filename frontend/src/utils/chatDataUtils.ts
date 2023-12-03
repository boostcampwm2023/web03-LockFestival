import { UserInfo, UserInfoObject } from 'types/chat';

export const userDataTransformer = (serverUserData: UserInfo[]) => {
  return serverUserData.reduce((acc: UserInfoObject, user: UserInfo) => {
    const { isLeader, isLeave, isMe, nickname, profileImg, userId, lastReadChatId } = user;

    acc.set(userId, {
      isLeader,
      isLeave,
      isMe,
      nickname,
      profileImg,
      lastReadChatId,
    });

    return acc;
  }, new Map());
};
