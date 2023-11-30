import { getTimeByDate, getStringByDate } from '@utils/dateUtil';
import tw, { styled, css } from 'twin.macro';
import { GroupProps } from 'types/group';

const RoomContent = ({
  contents,
  lastChat,
  lastChatTime,
  haveNewMessage,
}: Pick<GroupProps, 'contents' | 'lastChat' | 'lastChatTime' | 'haveNewMessage'>) => {
  return (
    <Container>
      <Content>{contents}</Content>
      <LastChat>
        <Chat>{lastChat}</Chat>
        <Time>{`${getStringByDate(new Date(lastChatTime))} ${getTimeByDate(
          new Date(lastChatTime)
        )}`}</Time>
      </LastChat>
    </Container>
  );
};

const Container = styled.div([
  tw`h-[10.4rem] p-2 gap-x-4 rounded-[2rem] bg-gray font-pretendard`,
  tw`desktop:(w-[56rem])`,
  tw`tablet:(flex-1)`,
  tw`mobile:(flex-1)`,
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
]);

const Content = styled.div([
  tw`text-m h-[3.2rem]`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const LastChat = styled(Content)([tw`h-[2.4rem]`]);

const Chat = styled.div([tw`pr-4`]);
const Time = styled.div([tw`text-s`]);

export default RoomContent;
