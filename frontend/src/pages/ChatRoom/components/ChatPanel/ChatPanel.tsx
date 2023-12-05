import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaRightFromBracket } from 'react-icons/fa6';
import useInput from '@hooks/useInput';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chatLogAtom } from 'store/chatRoom';
import { ChatLog } from 'types/chat';
import MessageBox from './MessageBox/MessageBox';
import { useEffect, useRef, useState } from 'react';
import useIntersectionObserverSocket from '@hooks/useIntersectionObserverSocket';

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
        {chatLogData && <div ref={targetRef} />}
        {chatLogData &&
          Array.from(chatLogData).map(([logId, chat]) => {
            return (
              <MessageBox
                key={logId}
                message={chat.message}
                userId={chat.userId}
                type={chat.type}
                time={chat.time}
              />
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
  tw`w-[100%] h-[100%] bg-white rounded-[2rem] font-pretendard text-l p-4`,
  css`
    overflow-y: scroll;
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
