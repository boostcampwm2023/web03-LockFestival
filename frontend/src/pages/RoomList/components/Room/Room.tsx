import tw, { styled, css } from 'twin.macro';

import { GroupProps } from 'types/group';

import RoomHeader from './RoomHeader';
import RoomContent from './RoomContent';
import RoomFooter from './RoomFooter';

const Room = ({
  themeId,
  themeName,
  posterImageUrl,
  branchName,
  groupId,
  recruitmentContent,
  lastChatMessage,
  lastChatTime,
  hasNewChat,
  newChatCount,
}: GroupProps) => {
  return (
    <Container>
      <Wrapper>
        <RoomHeader posterImageUrl={posterImageUrl} branchName={branchName} themeName={themeName} />
        <RoomContent
          recruitmentContent={recruitmentContent}
          lastChatMessage={lastChatMessage}
          lastChatTime={lastChatTime}
          hasNewChat={hasNewChat}
        />
      </Wrapper>
      <RoomFooter groupId={groupId} />
    </Container>
  );
};

const Container = styled.div([
  tw`w-full mx-auto p-4 h-[14.4rem] bg-gray-light text-white rounded-[2rem]`,
  tw`tablet:(w-[95%] flex-col h-auto items-start)`,
  tw`mobile:(w-[95%] flex-col h-auto items-start)`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const Wrapper = styled.div([
  tw`tablet:(w-full)`,
  tw`mobile:(w-full)`,
  css`
    display: flex;
    align-items: center;
    column-gap: 2rem;
  `,
]);

export default Room;
