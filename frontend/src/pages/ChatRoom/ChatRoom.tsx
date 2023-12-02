import tw, { styled, css } from 'twin.macro';
import { useParams } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack from './components/ErrorFallback/ErrorFallBack';
import HostIdentification from './components/Validators/HostIdentification';
import useSocket from '@hooks/socket/useSocket';
import ChatRoomInfoValidator from './components/Validators/ChatRoomIfoValidator';
import ChatRoomContainer from './components/ChatRoomContainer';

const ChatRoom = () => {
  const roomId = useParams<{ roomId: string }>().roomId as string;
  const { connecting, sendChat } = useSocket(roomId);

  return connecting ? (
    <Loading>
      <h1>채팅방 정보를 불러오는 중</h1>
    </Loading>
  ) : (
    <ErrorBoundary fallbackRender={(fallbackProps) => <ErrorFallBack {...fallbackProps} />}>
      <ChatRoomInfoValidator>
        <HostIdentification>
          <ChatRoomContainer roomId={roomId} sendChat={sendChat} />
        </HostIdentification>
      </ChatRoomInfoValidator>
    </ErrorBoundary>
  );
};

const Loading = styled.div([
  tw`w-full font-pretendard text-xl text-white`,
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50rem;
  `,
]);

export default ChatRoom;
