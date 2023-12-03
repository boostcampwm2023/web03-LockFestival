import tw, { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';
import { userListInfoAtom } from '@store/chatRoom';
import { useRecoilValue } from 'recoil';

const MessageBox = ({ message, userId, type, time }: ChatLog) => {
  const userData = useRecoilValue(userListInfoAtom);
  const nickname = userData?.get(userId)?.nickname;
  return (
    <>
      <MessageLayout>
        <div>{message}</div>
      </MessageLayout>
      <div>{nickname}</div>
    </>
  );
};

export default MessageBox;

const MessageLayout = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 15rem;
    padding: 1rem;
    margin-bottom: 1rem;
  `,
  tw`font-pretendard text-m border border-gray border-solid rounded-[2rem]`,
]);
