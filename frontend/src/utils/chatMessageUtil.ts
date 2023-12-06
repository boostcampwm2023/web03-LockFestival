import { ChatLog } from 'types/chat';
import { checkDateIsSameDate } from './dateUtil';

// 특정 날짜의 첫 번째 채팅인지 확인한다.
const checkIsFirstChatToday = (targetIndex: number, chatLogData: [string, ChatLog][]): boolean => {
  if (targetIndex === 0) {
    return false;
  }
  const prevTime = chatLogData[targetIndex - 1][1].time;
  const targetTime = chatLogData[targetIndex][1].time;
  return checkDateIsSameDate(new Date(prevTime), new Date(targetTime));
};

export { checkIsFirstChatToday };
