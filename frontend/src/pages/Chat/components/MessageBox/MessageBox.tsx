import tw, { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';

const MessageBox = ({ message, userId, type, time }: ChatLog) => {
  return (
    <MessageLayout>
      {message} {userId} {time.toLocaleString('ko-KR', { timeZone: 'UTC' })}
    </MessageLayout>
  );
};

export default MessageBox;

const MessageLayout = styled.div([
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15rem;
    padding: 1rem;
  `,
  tw`font-pretendard text-m border border-gray border-solid rounded-[2rem]`,
]);
