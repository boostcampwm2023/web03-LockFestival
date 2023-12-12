import { ChatLog } from 'types/chat';
import { checkDateIsSameDate, getTimeByDate } from './dateUtil';

// 특정 날짜의 첫 번째 채팅인지 확인한다.
const checkIsFirstChatToday = (
  targetIndex: number,
  chatLogData: Array<[string, ChatLog]>
): boolean => {
  if (targetIndex === 0) {
    return true;
  }

  const prevTime = chatLogData[targetIndex - 1][1].time;
  const targetTime = chatLogData[targetIndex][1].time;
  return !checkDateIsSameDate(new Date(prevTime), new Date(targetTime));
};

// 프로필 표시 여부
const checkIsFirstChatFromUser = (
  targetIndex: number,
  chatLogData: Array<[string, ChatLog]>
): boolean => {
  if (targetIndex === 0) {
    return true;
  }

  const prevData = chatLogData[targetIndex - 1][1];
  const targetData = chatLogData[targetIndex][1];

  const prevTime = getTimeByDate(new Date(prevData.time));
  const targetTime = getTimeByDate(new Date(targetData.time));

  return prevTime !== targetTime || prevData.userId !== targetData.userId;
};

// 시각 표시 여부
const checkIsLastChatFromUser = (
  targetIndex: number,
  chatLogData: [string, ChatLog][]
): boolean => {
  if (targetIndex === chatLogData.length - 1) {
    return true;
  }

  const targetData = chatLogData[targetIndex][1];
  const nextData = chatLogData[targetIndex + 1][1];

  const targetTime = getTimeByDate(new Date(targetData.time));
  const nextTime = getTimeByDate(new Date(nextData.time));

  const targetUser = targetData.userId;
  const nextUser = nextData.userId;

  if (targetTime !== nextTime) {
    return true;
  }

  if (targetUser !== nextUser) {
    return true;
  }

  return false;
};

export { checkIsFirstChatToday, checkIsFirstChatFromUser, checkIsLastChatFromUser };
