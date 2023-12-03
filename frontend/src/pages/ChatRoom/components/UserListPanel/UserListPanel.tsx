import tw, { styled, css } from 'twin.macro';
import UserItem from './UserItem/UserItem';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userListInfoAtom } from '@store/chatRoom';
import { UserInfoObject } from 'types/chat';

const UserListPanel = ({ settingMode }: { settingMode: boolean }) => {
  const userListInfo = useRecoilValue(userListInfoAtom) as UserInfoObject;
  const navigate = useNavigate();
  const handlerLeaveRoom = () => {
    //TODO: emit leave
    navigate('/group-chat');
  };

  const handleUserKick = (e: React.MouseEvent) => {
    if (e.target) {
      //TODO: emit kick
      console.log((e.currentTarget as HTMLButtonElement).dataset.userId);
    }
  };

  return (
    <Layout>
      <UserListWrapper>
        {Array.from(userListInfo).map(([userId, userData]) => {
          const { nickname, profileImg, isLeader, isLeave, isMe, lastReadChatId } = userData;
          if (!isLeave) {
            return (
              <UserItemWrapper key={userId}>
                <UserItem
                  lastReadChatId={lastReadChatId}
                  nickname={nickname}
                  profileImg={profileImg}
                  isLeader={isLeader}
                  isMe={isMe}
                />
                <ButtonWrapper settingMode={settingMode}>
                  <Button
                    isIcon={false}
                    width="100%"
                    data-user-id={userId}
                    onClick={handleUserKick}
                  >
                    <Text>추방</Text>
                  </Button>
                </ButtonWrapper>
                <Division />
              </UserItemWrapper>
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
  `,
]);

const UserItemWrapper = styled.div([
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.6rem;
  `,
]);

const ButtonWrapper = styled.div(({ settingMode }: { settingMode: boolean }) => [
  !settingMode &&
    css`
      display: none;
    `,
  settingMode &&
    css`
      display: flex;
      justify-content: center;
      align-items: flex-end;
      width: 50%;
      margin-bottom: 1.2rem;
    `,
]);

const Text = styled.div([tw`mx-auto`]);

const Division = styled.div([tw`w-[100%] h-[0.1rem] bg-white-60 mb-4`]);
