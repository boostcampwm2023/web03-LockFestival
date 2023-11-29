import { useSearchParams } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import ChatContainer from './components/ChatContainer';
import RoomInfoContainer from './components/RoomInfoContainer';
import UserListContainer from './components/UserListContainer';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  return (
    <Container>
      <UserListContainer />
      <ChatContainer />
      <RoomInfoContainer />
    </Container>
  );
};

export default Chat;
const Container = styled.div([
  tw`w-full mx-auto mt-[4rem] h-[calc(100vh -10rem)]`,
  tw`desktop:(max-w-[102.4rem] pb-[10rem])`,
  css`
    display: flex;
    gap: 3.2rem;
  `,
]);
