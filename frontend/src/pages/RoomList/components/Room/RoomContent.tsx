import { getTimeByDate, getStringByDate, isTodayByDate } from '@utils/dateUtil';
import tw, { styled, css } from 'twin.macro';
import { GroupProps } from 'types/group';

const RoomContent = ({
  recruitmentContent,
  lastChatMessage,
  lastChatTime,
  hasNewChat,
}: Pick<GroupProps, 'recruitmentContent' | 'lastChatMessage' | 'lastChatTime' | 'hasNewChat'>) => {
  const renderDate = (dateString: string) => {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);

    if (isTodayByDate(date)) {
      return getTimeByDate(date);
    }

    return getStringByDate(date);
  };

  return (
    <Container>
      <Content>방 설명 : {recruitmentContent}</Content>
      <LastChat>{lastChatMessage || '마지막 채팅이 없어요! 채팅을 시작해보세요~'}</LastChat>
      <ChatTime>{renderDate(lastChatTime)}</ChatTime>
    </Container>
  );
};

const Container = styled.div([
  tw`h-[10.4rem] p-2 gap-x-4 rounded-[2rem] bg-gray font-pretendard`,
  tw`desktop:(w-[56rem])`,
  tw`tablet:(flex-1 w-full)`,
  tw`mobile:(flex-1 w-full)`,
  css`
    position: relative;
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

const LastChat = styled.div([
  tw`h-[2.4rem] text-m max-w-[40rem]`,
  tw`tablet:(max-w-[35rem])`,
  tw`mobile:(max-w-[25rem])`,
  css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `,
]);

const ChatTime = styled.div([
  tw`text-s`,
  css`
    top: 2rem;
    right: 2rem;
    position: absolute;
  `,
]);

export default RoomContent;
