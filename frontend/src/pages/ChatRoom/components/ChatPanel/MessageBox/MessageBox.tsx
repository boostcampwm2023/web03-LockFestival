import { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';
import { userListInfoAtom } from '@store/chatRoom';
import { useRecoilValue } from 'recoil';
import MyChatBox from './BoxType/MyChatBox';
import OtherChatBox from './BoxType/OtherChatBox';
import SystemChatBox from './BoxType/SystemChatBox';
import { memo } from 'react';
interface Props extends ChatLog {
  logId: string;
  isFirstChat: boolean;
  isLastChat: boolean;
  unreadCount: number;
}

const MessageBox = memo(function MessageBox({
  message,
  userId,
  type,
  time,
  isFirstChat,
  isLastChat,
  unreadCount,
}: Props) {
  const userData = useRecoilValue(userListInfoAtom);

  const { nickname, isMe, profileImg } = userData?.get(userId) || {
    nickname: '알 수 없는 사용자',
    isMe: false,
    profileImg: '',
  };

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
});

const Layout = styled.div<{ isMe: boolean; type: string }>(({ isMe, type }) => [
  css`
    display: flex;
    flex-direction: column;
    align-items: ${type !== 'message' ? 'center' : isMe ? 'flex-end' : 'flex-start'};
  `,
]);

export default MessageBox;
