import tw, { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';

const MessageBox = ({ message, userId, type, time }: ChatLog) => {
  return (
    <>
      <MessageLayout>
        <div>{message}</div>

        {/* {time.toLocaleString('ko-KR', { timeZone: 'UTC' })} */}
      </MessageLayout>
      <div>{userId}</div>
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
