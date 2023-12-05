import { ChatLog, ServerChatLog, UserInfo, UserInfoObject } from 'types/chat';

export const userDataTransformer = (serverUserData: UserInfo[]) => {
  return serverUserData.reduce((acc: UserInfoObject, user: UserInfo) => {
    const { isLeader, isLeave, isMe, nickname, profileImg, userId, lastChatLogId } = user;

    acc.set(userId, {
      isLeader,
      isLeave,
      isMe,
      nickname,
      profileImg,
      lastChatLogId,
    });

    return acc;
  }, new Map());
};

export const chatLogDataTransformer = (serverChatLogData: ServerChatLog[]) => {
  return serverChatLogData.reduce((acc: Map<string, ChatLog>, cur: ServerChatLog) => {
    const { chatId, message, userId, type, time } = cur;
    return acc.set(chatId, {
      message,
      userId,
      type,
      time,
    });
  }, new Map());
};
