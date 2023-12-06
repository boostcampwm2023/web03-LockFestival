import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaRightFromBracket } from 'react-icons/fa6';
import useInput from '@hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chatLogAtom } from 'store/chatRoom';
import { ChatLog } from 'types/chat';
import MessageBox from './MessageBox/MessageBox';
import { useEffect, useMemo, useRef, useState } from 'react';
import useIntersectionObserverSocket from '@hooks/useIntersectionObserverSocket';
import { getStringByDate } from '@utils/dateUtil';
import {
  checkIsFirstChatFromUser,
  checkIsFirstChatToday,
  checkIsLastChatFromUser,
} from '@utils/chatMessageUtil';

interface ChatPanelProps {
  roomId: string;
  sendChat: (message: string) => void;
  getPastChat: (cursorId: string) => void;
}

const ChatPanel = ({ roomId, sendChat, getPastChat }: ChatPanelProps) => {
  const chatLogData: Map<string, ChatLog> = useRecoilValue(chatLogAtom)[roomId];

  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef<HTMLDivElement>(null);

  const [isScrollToTop, setIsScrollToTop] = useState<boolean>(false);

  useIntersectionObserverSocket({
    eventHandler: getPastChat,
    targetRef,
    roomId,
  });

  const navigate = useNavigate();
  const [inputValue, handleValue, resetValue] = useInput('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const preventDefault = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    if (inputValue === '') {
      return;
    }
    if (lastScrollRef.current) {
      lastScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    sendChat(inputValue);
    resetValue();
  };

  useEffect(() => {
    if (lastScrollRef.current && !isScrollToTop) {
      lastScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLogData]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const target1 = scrollRef.current.scrollHeight - scrollRef.current.clientHeight;
      const target2 = scrollRef.current.scrollTop;

      if (Math.abs(target1 - target2) < 20) {
        setIsScrollToTop(false);
        return;
      }

      setIsScrollToTop(true);
    }
  };

  const chatArrayFromChatLogData = useMemo(() => {
    return Array.from(chatLogData);
  }, [chatLogData]);

  return (
    <Layout>
      <ButtonWrapper>
        <Button
          isIcon={true}
          onClick={() => {
            //TODO: emit leave
            navigate('/room-list');
          }}
        >
          <FaRightFromBracket />
        </Button>
      </ButtonWrapper>
      <ChatDisplayContainer ref={scrollRef} onScroll={() => handleScroll()}>
        {chatArrayFromChatLogData && <div ref={targetRef} />}
        {chatArrayFromChatLogData &&
          chatArrayFromChatLogData.map(([logId, chat], index) => {
            return (
              <>
                {!checkIsFirstChatToday(index, chatArrayFromChatLogData) && (
                  <DateDisplayWrapper>
                    <HorizontalLine />
                    <DateDisplay>{getStringByDate(new Date(chat.time))}</DateDisplay>
                    <HorizontalLine />
                  </DateDisplayWrapper>
                )}

                <MessageBox
                  key={logId}
                  logId={logId}
                  message={chat.message}
                  userId={chat.userId}
                  type={chat.type}
                  time={chat.time}
                  isFirstChat={checkIsFirstChatFromUser(index, chatArrayFromChatLogData)}
                  isLastChat={checkIsLastChatFromUser(index, chatArrayFromChatLogData)}
                />
              </>
            );
          })}
        <div ref={lastScrollRef}></div>
      </ChatDisplayContainer>
      <InputChatPanel
        value={inputValue}
        onChange={handleValue}
        rows={4}
        onKeyDown={handleKeyDown}
        onFocus={preventDefault}
        onBlur={preventDefault}
      />
      <SendButtonWrapper>
        <Button type="button" isIcon={false} onClick={handleSubmit}>
          <>보내기</>
        </Button>
      </SendButtonWrapper>
    </Layout>
  );
};

export default ChatPanel;
const Layout = styled.div([
  css`
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 49rem;
    height: 100vh;
    padding: 2rem;
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)]`,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    justify-content: flex-end;
    width: 100%;
  `,
]);

const ChatDisplayContainer = styled.div([
  tw`w-[100%] h-[100%] bg-white rounded-[1rem] font-pretendard text-l pt-4 pb-4 pl-4 pr-2`,
  css`
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 1rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #d2dad0;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: #222222;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  `,
]);

const InputChatPanel = styled.textarea([
  tw`font-pretendard text-white text-m w-[100%] h-[10rem] bg-gray rounded-[2rem] p-4 pr-[6.4rem]`,
  css`
    resize: none;

    &:focus {
      outline: none;
    }
  `,
]);

const SendButtonWrapper = styled.div([
  css`
    position: absolute;
    bottom: 3rem;
    right: 3rem;
  `,
]);

const DateDisplayWrapper = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 0.8rem;
  `,
]);

const HorizontalLine = styled.div([
  css`
    display: flex;
    flex: 1;
    height: 1px;
    background-color: black;
  `,
]);

const DateDisplay = styled.div([]);
