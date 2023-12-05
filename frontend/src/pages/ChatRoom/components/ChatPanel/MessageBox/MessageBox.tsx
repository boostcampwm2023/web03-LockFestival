import { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';
import { userListInfoAtom } from '@store/chatRoom';
import { useRecoilValue } from 'recoil';
import MyChatBox from './BoxType/MyChatBox';
import OtherChatBox from './BoxType/OtherChatBox';
import SystemChatBox from './BoxType/SystemChatBox';

const MessageBox = ({ message, userId, type, time }: ChatLog) => {
  const userData = useRecoilValue(userListInfoAtom);
  const myData = userData?.get(userId) || {
    nickname: '알 수 없는 사용자',
    isMe: false,
    profileImg: '',
  };
  const { nickname, isMe, profileImg } = myData;

  // 같은 년 월 일, 시각 분, 사용자가 같으면 하나의 nickname만

  return (
    <Layout type={type} isMe={isMe}>
      {type !== 'message' && <SystemChatBox message={message} />}
      {type === 'message' && isMe ? (
        <MyChatBox message={message} time={time} />
      ) : (
        <OtherChatBox message={message} time={time} nickname={nickname} profileImg={profileImg} />
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
