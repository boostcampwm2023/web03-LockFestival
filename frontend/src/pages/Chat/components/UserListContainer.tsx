import tw, { styled, css } from 'twin.macro';
import UserItem from './UserItem/UserItem';
import mockUserData from '../mock/mockUserData';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

const UserListContainer = () => {
  const navigate = useNavigate();
  const handlerLeaveRoom = () => {
    //TODO: emit leave
    navigate('/group-chat');
  };
  return (
    <Layout>
      <UserListWrapper>
        {mockUserData.map((user) => {
          const { userId, nickname, profileImg, isLeader, isLeave, isMe } = user;
          if (!isLeave) {
            return (
              <>
                <UserItem
                  key={userId}
                  nickname={nickname}
                  profileImg={profileImg}
                  isLeader={isLeader}
                  isMe={isMe}
                />
                <Division />
              </>
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
