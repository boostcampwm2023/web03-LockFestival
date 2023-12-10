import tw, { styled, css } from 'twin.macro';
import { ChatLog } from 'types/chat';
import { useRecoilValue } from 'recoil';
import { userListInfoAtom } from '@store/chatRoom';
import { FaCircleUser } from 'react-icons/fa6';

const PopUpMessageBox = ({ message, userId }: Omit<ChatLog, 'time' | 'type'>) => {
  const userListInfo = useRecoilValue(userListInfoAtom);
  const curUser = userListInfo?.get(userId);

  return (
    <Layout>
      {curUser?.profileImg ? <ProfileImg src={curUser?.profileImg} /> : <FaCircleUser size="28" />}
      <div>{curUser?.nickname}</div>
      <MessageText>{message}</MessageText>
    </Layout>
  );
};

export default PopUpMessageBox;

const Layout = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
  `,
  tw`w-full font-pretendard text-m`,
]);

const ProfileImg = styled.img([
  tw`w-[3.2rem] h-[3.2rem] rounded-[50%] p-1`,
  css`
    border: 1px solid black;
  `,
]);

const MessageText = styled.div([
  css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  `,
]);
