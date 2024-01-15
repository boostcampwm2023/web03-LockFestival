import tw, { styled, css } from 'twin.macro';
import UserItem from './UserItem/UserItem';
import Button from '@components/Button/Button';
import { DefaultValue, useRecoilValue, useSetRecoilState } from 'recoil';
import { mobileMenuSelector, userListInfoAtom } from '@store/chatRoom';
import { UserInfoObject } from 'types/chat';
import useLeaveRoomMutation from '@hooks/mutation/useLeaveRoomMutation';
import { memo, useRef } from 'react';
import Swal from 'sweetalert2';
import { keyframes } from '@emotion/react';
import useTouchSlidePanel from '@hooks/useTouchSlidePanel';

interface Props {
  roomId: string;
  settingMode: boolean;
  kickUser: (userId: string) => void;
}

const UserListPanel = memo(function UserListPanel({ roomId, settingMode, kickUser }: Props) {
  const userListInfo = useRecoilValue(userListInfoAtom) as UserInfoObject;
  const { mutate } = useLeaveRoomMutation(Number(roomId));
  const ref = useRef<HTMLDivElement>(null);
  const { menuState, handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchSlidePanel(
    ref,
    'userListMenuSelected'
  );
  const setMobileMenuClicked = useSetRecoilState(mobileMenuSelector('mobileMenuClicked'));

  const handlerLeaveRoom = async () => {
    const result = await Swal.fire({
      icon: 'info',
      title: '정말로 방을 나가시겠습니까?',
      text: '나간 이후 복구할 수 없습니다.',
      showCloseButton: true,
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      mutate(Number(roomId));
      setMobileMenuClicked(false);
    }
  };

  const handleUserKick = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    const userId = button?.dataset.userId;

    if (button && userId) {
      kickUser(userId);
    }
  };

  return (
    <Layout
      ref={ref}
      menuState={menuState}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <UserListWrapper>
        {Array.from(userListInfo).map(([userId, userData]) => {
          const { nickname, profileImg, isLeader, isLeave, isMe, lastChatLogId } = userData;
          if (!isLeave) {
            return (
              <UserItemWrapper key={userId}>
                <UserItem
                  lastChatLogId={lastChatLogId}
                  nickname={nickname}
                  profileImg={profileImg}
                  isLeader={isLeader}
                  isMe={isMe}
                />
                {!isMe && (
                  <ButtonWrapper settingMode={settingMode}>
                    <Button isIcon={false} data-user-id={userId} size="s" onClick={handleUserKick}>
                      <Text>추방</Text>
                    </Button>
                  </ButtonWrapper>
                )}
              </UserItemWrapper>
            );
          }
          return null;
        })}
      </UserListWrapper>
      <ExitButtonWrapper>
        <Button isIcon={false} onClick={handlerLeaveRoom}>
          <>채팅방 나가기</>
        </Button>
      </ExitButtonWrapper>
    </Layout>
  );
});

export default UserListPanel;

const slideInAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const Layout = styled.div(({ menuState }: { menuState: boolean | DefaultValue }) => [
  css`
    display: flex;
    flex-direction: column;
    width: 26rem;
    padding: 2rem;
    justify-content: space-between;
    align-items: center;

    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #f2f2f2;
      border-radius: 0.5rem;
    }
    ::-webkit-scrollbar-track {
      background-color: #222222;
      border-radius: 0.5rem;
      box-shadow: inset 0px 0px 5px white;
    }
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)]`,
  tw`
    tablet:(absolute left-[0] rounded-l-[0] border border-solid border-l-0 border-white-60)
  `,
  tw`
    mobile:(absolute left-[0] rounded-l-[0] border border-solid border-l-0 border-white-60)
  `,
  menuState &&
    css`
      animation: ${slideInAnimation} 0.3s ease-in forwards;
    `,
]);

const UserListWrapper = styled.div([tw`w-full`]);

const UserItemWrapper = styled.div([
  css`
    display: flex;
    align-items: center;
  `,
]);

const ButtonWrapper = styled.div(({ settingMode }: { settingMode: boolean }) => [
  !settingMode &&
    css`
      display: none;
    `,
  settingMode && css``,
]);

const ExitButtonWrapper = styled.div([
  tw`h-[3.2rem]`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const Text = styled.div([tw`mx-auto`]);
