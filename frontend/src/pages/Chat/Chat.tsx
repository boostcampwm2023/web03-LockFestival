import tw, { styled, css } from 'twin.macro';
import ChatContainer from './components/ChatContainer';
import RoomInfoContainer from './components/RoomInfoContainer';
import UserListContainer from './components/UserListContainer';
import { useParams } from 'react-router-dom';
import useSocket from '@hooks/socket/useSocket';

const Chat = () => {
  const roomId = useParams<{ roomId: string }>().roomId as string;

  const { roomInfo, userListInfo, sendChat } = useSocket(roomId);

  if (!roomInfo || !userListInfo) {
    return;
  }

  return (
    <Container>
      <UserListContainer userListInfo={userListInfo} />
      <ChatContainer userListInfo={userListInfo} roomId={roomId} sendChat={sendChat} />
      <RoomInfoContainer roomInfo={roomInfo} />
    </Container>
  );
};

const Container = styled.div([
  tw`w-full mx-auto mt-[4rem] h-[calc(100vh -10rem)]`,
  tw`desktop:(max-w-[102.4rem] pb-[10rem])`,
  css`
    display: flex;
    gap: 3.2rem;
  `,
]);

export default Chat;
