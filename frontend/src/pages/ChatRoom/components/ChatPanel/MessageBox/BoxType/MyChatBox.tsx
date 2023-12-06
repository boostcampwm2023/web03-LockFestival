import { getTimeByDate } from '@utils/dateUtil';
import tw, { css, styled } from 'twin.macro';

interface BoxProps {
  message: string;
  time: Date;
  unreadCount: number | undefined;
  isLastChat: boolean;
}

const MyChatBox = ({ message, time, unreadCount, isLastChat }: BoxProps) => {
  return (
    <Container>
      <TextContainer>
        <RestContent>
          {unreadCount !== 0 && <UnreadContent>{unreadCount}</UnreadContent>}
          {isLastChat && <DateContent>{getTimeByDate(new Date(time))}</DateContent>}
        </RestContent>
        <MessageContent>{message}</MessageContent>
      </TextContainer>
    </Container>
  );
};

const Container = styled.div([
  tw`w-full my-2`,
  css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
  `,
]);

const TextContainer = styled.div([
  css`
    display: flex;
    align-items: flex-end;
    gap: 0.6rem;
  `,
]);

const DateContent = styled.div([
  tw`text-xs pb-[0.2rem]`,
  css`
    height: inherit;
  `,
]);

const MessageContent = styled.div([
  tw`border border-gray border-solid rounded-[1.2rem] px-2 py-1`,
  css`
    max-width: 25rem;
    width: fit-content;
    word-break: break-all;
  `,
]);

const RestContent = styled.div([tw`text-xs`]);

const UnreadContent = styled.div([
  tw`text-orange`,
  css`
    text-align: right;
  `,
]);

export default MyChatBox;
