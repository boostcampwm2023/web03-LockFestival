import tw, { styled, css } from 'twin.macro';
import GroupHeader from './GroupHeader';
import GroupContent from './GroupContent';
import GroupFooter from './GroupFooter';
import { GroupProps } from 'types/group';

const Group = ({
  groupId,
  posterImageUrl,
  branchName,
  themeName,
  contents,
  lastChat,
  lastChatTime,
  haveNewMessage,
}: GroupProps) => {
  return (
    <Container>
      <Wrapper>
        <GroupHeader
          posterImageUrl={posterImageUrl}
          branchName={branchName}
          themeName={themeName}
        />
        <GroupContent
          contents={contents}
          lastChat={lastChat}
          lastChatTime={lastChatTime}
          haveNewMessage={haveNewMessage}
        />
      </Wrapper>
      <GroupFooter groupId={groupId} />
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

export default Group;
