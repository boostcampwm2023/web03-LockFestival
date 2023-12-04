import tw, { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';
import { userListInfoAtom } from '@store/chatRoom';
import { useRecoilValue } from 'recoil';
import { getStringByDate, getTimeByDate } from '@utils/dateUtil';

const MessageBox = ({ message, userId, type, time }: ChatLog) => {
  const userData = useRecoilValue(userListInfoAtom);
  const nickname = userData?.get(userId)?.nickname;
  return (
    <Layout>
      <MessageLayout>
        <div>{nickname}</div>
        <div>
          {message}
          <br />
          {getStringByDate(new Date(time))} {getTimeByDate(new Date(time))}
        </div>
      </MessageLayout>
    </Layout>
  );
};

export default MessageBox;

const Layout = styled.div([
  css`
    display: flex;
    flex-direction: column;
  `,
]);

const MessageLayout = styled.div([
  css`
    display: flex;
    flex-direction: column;
    width: fit-content;
    max-width: 30rem;
    margin-bottom: 1rem;
  `,
  tw`font-pretendard text-m border border-gray border-solid rounded-[2rem] p-4 mt-4`,
]);
