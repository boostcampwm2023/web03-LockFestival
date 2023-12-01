import tw, { styled, css } from 'twin.macro';
import UserItem from './UserItem/UserItem';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { UserInfo } from 'types/chat';

const UserListContainer = ({ userListInfo }: { userListInfo: UserInfo[] }) => {
  const navigate = useNavigate();
  const handlerLeaveRoom = () => {
    //TODO: emit leave
    navigate('/group-chat');
  };
  return (
    <Layout>
      <UserListWrapper>
        {userListInfo.map((user: UserInfo) => {
          const { userId, nickname, profileImg, isLeader, isLeave, isMe } = user;
          if (!isLeave) {
            return (
              <div key={userId}>
                <UserItem
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

export default UserListContainer;

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
