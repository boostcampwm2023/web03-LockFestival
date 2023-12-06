import { ChatLog } from 'types/chat';
import { checkDateIsSameDate, getTimeByDate } from './dateUtil';

// 특정 날짜의 첫 번째 채팅인지 확인한다.
const checkIsFirstChatToday = (targetIndex: number, chatLogData: [string, ChatLog][]): boolean => {
  if (targetIndex === 0) {
    return false;
  }
  const prevTime = chatLogData[targetIndex - 1][1].time;
  const targetTime = chatLogData[targetIndex][1].time;
  return checkDateIsSameDate(new Date(prevTime), new Date(targetTime));
};

// 프로필 표시 여부
const checkIsFirstChatFromUser = (
  targetIndex: number,
  chatLogData: [string, ChatLog][]
): boolean => {
  if (targetIndex === 0) {
    return true;
  }

  const prevData = chatLogData[targetIndex - 1][1];
  const targetData = chatLogData[targetIndex][1];

  const prevUser = prevData.userId;
  const prevTime = getTimeByDate(new Date(prevData.time));
  const targetUser = targetData.userId;
  const targetTime = getTimeByDate(new Date(targetData.time));

  // 특정 유저의 채팅이 해당 시각에 첫 번째 채팅이면
  if (prevTime !== targetTime) {
    return true;
  }

  // 같은 시각이지만 사용자가 다르면
  if (prevUser !== targetUser) {
    return true;
  }

  return false;
};

export { checkIsFirstChatToday, checkIsFirstChatFromUser };
