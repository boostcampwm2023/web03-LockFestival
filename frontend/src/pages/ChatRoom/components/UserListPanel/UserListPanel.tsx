import tw, { styled, css } from 'twin.macro';
import UserItem from './UserItem/UserItem';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userListInfoAtom } from '@store/chatRoom';
import { UserInfoObject } from 'types/chat';

const UserListPanel = () => {
  const userListInfo = useRecoilValue(userListInfoAtom) as UserInfoObject;
  const navigate = useNavigate();
  const handlerLeaveRoom = () => {
    //TODO: emit leave
    navigate('/group-chat');
  };

  return (
    <Layout>
      <UserListWrapper>
        {Array.from(userListInfo).map(([userId, userData]) => {
          const { nickname, profileImg, isLeader, isLeave, isMe, lastReadChatId } = userData;
          if (!isLeave) {
            return (
              <div key={userId}>
                <UserItem
                  lastReadChatId={lastReadChatId}
                  nickname={nickname}
                  profileImg={profileImg}
                  isLeader={isLeader}
                  isMe={isMe}
                />
                <Division />
              </div>
            );
          }
        })}
      </UserListWrapper>
      <Button isIcon={false} onClick={handlerLeaveRoom}>
        <>채팅방 나가기</>
      </Button>
    </Layout>
  );
};

export default UserListPanel;

const Layout = styled.div([
  css`
    display: flex;
    flex-direction: column;
    width: 20.8rem;
    padding: 2rem;
    justify-content: space-between;
    align-items: center;
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)]`,
]);

const UserListWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
]);

const Division = styled.div([tw`w-[85%] h-[0.1rem] bg-gray`]);
