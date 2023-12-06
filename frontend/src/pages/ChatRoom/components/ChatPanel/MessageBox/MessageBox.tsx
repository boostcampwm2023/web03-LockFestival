import { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';
import { chatUnreadAtom, userListInfoAtom } from '@store/chatRoom';
import { useRecoilValue } from 'recoil';
import MyChatBox from './BoxType/MyChatBox';
import OtherChatBox from './BoxType/OtherChatBox';
import SystemChatBox from './BoxType/SystemChatBox';
import { useMemo } from 'react';
interface Props extends ChatLog {
  logId: string;
  isFirstChat: boolean;
  isLastChat: boolean;
}

const MessageBox = ({ logId, message, userId, type, time, isFirstChat, isLastChat }: Props) => {
  const chatUnread = useRecoilValue(chatUnreadAtom);
  const userData = useRecoilValue(userListInfoAtom);
  const myData = userData?.get(userId) || {
    nickname: '알 수 없는 사용자',
    isMe: false,
    profileImg: '',
  };
  const { nickname, isMe, profileImg } = myData;

  const unreadCount = useMemo(() => {
    if (!chatUnread) {
      return 0;
    }
    const mapArr = new Array(...chatUnread).sort(([key1], [key2]) => {
      return key1.localeCompare(key2);
    });

    for (let i = 0; i < mapArr.length; i++) {
      if (logId <= mapArr[i][1]) {
        if (i === 0) {
          return 0;
        }
        return Number(mapArr[i - 1][0]);
      }
    }

    if (mapArr.length === 0) {
      return 0;
    }

    return Number(mapArr[mapArr.length - 1][0]);
  }, [chatUnread]);

  // 같은 년 월 일, 시각 분, 사용자가 같으면 하나의 nickname만

  return (
    <Layout type={type} isMe={isMe}>
      {type !== 'message' && <SystemChatBox message={message} />}
      {type === 'message' && isMe && (
        <MyChatBox
          message={message}
          time={time}
          unreadCount={unreadCount}
          isLastChat={isLastChat}
        />
      )}
      {type === 'message' && !isMe && (
        <OtherChatBox
          message={message}
          time={time}
          nickname={nickname}
          profileImg={profileImg}
          unreadCount={unreadCount}
          isFirstChat={isFirstChat}
          isLastChat={isLastChat}
        />
      )}
    </Layout>
  );
};

const Layout = styled.div<{ isMe: boolean; type: string }>(({ isMe, type }) => [
  css`
    display: flex;
    flex-direction: column;
    align-items: ${type !== 'message' ? 'center' : isMe ? 'flex-end' : 'flex-start'};
  `,
]);

export default MessageBox;
