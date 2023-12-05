import tw, { styled, css } from 'twin.macro';
import UserListPanel from './UserListPanel/UserListPanel';
import ChatPanel from './ChatPanel/ChatPanel';
import RoomInfoPanel from './RoomInfoPanel/RoomInfoPanel';

interface Props {
  roomId: string;
  sendChat: (message: string) => void;
  settingMode: boolean;
  getPastChat: (cursorId: string) => void;
}

const ChatRoomContainer = ({ roomId, sendChat, settingMode, getPastChat }: Props) => {
  return (
    <Container>
      <UserListPanel settingMode={settingMode} />
      <ChatPanel roomId={roomId} sendChat={sendChat} getPastChat={getPastChat} />
      <RoomInfoPanel settingMode={settingMode} />
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

export default ChatRoomContainer;
