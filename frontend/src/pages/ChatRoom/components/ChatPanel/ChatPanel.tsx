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
import useIntersectionObserverSocket from '@hooks/intersectionObserver/useIntersectionObserverSocket';
import { getStringByDate } from '@utils/dateUtil';
import {
  checkIsFirstChatFromUser,
  checkIsFirstChatToday,
  checkIsLastChatFromUser,
} from '@utils/chatMessageUtil';
import useIsScrollTopObserver from '@hooks/intersectionObserver/useIsScrollTopObserver';
import { useVirtualizer } from '@tanstack/react-virtual';

interface ChatPanelProps {
  roomId: string;
  sendChat: (message: string) => void;
  getPastChat: (cursorId: string) => void;
}

const ChatPanel = ({ roomId, sendChat, getPastChat }: ChatPanelProps) => {
  const chatLogData: Map<string, ChatLog> = useRecoilValue(chatLogAtom)[roomId];
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef<HTMLDivElement>(null);

  const [isScrollToTop, setIsScrollToTop] = useState<boolean>(false);
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null);

  useIntersectionObserverSocket({
    eventHandler: getPastChat,
    targetRef,
    roomId,
  });

  useIsScrollTopObserver({
    eventHandler: setIsScrollToTop,
    targetRef: lastScrollRef,
  });

  const [inputValue, handleValue, resetValue] = useInput('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
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
    setIsScrollToTop(false);
    sendChat(inputValue);
    resetValue();
  };

  useEffect(() => {
    if (!isScrollToTop) {
      lastScrollRef?.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
    }
    if (parentRef.current && parentRef.current.scrollTop < 10 && prevScrollHeight) {
      parentRef.current.scrollTop = parentRef.current.scrollHeight - prevScrollHeight;
      return setPrevScrollHeight(null);
    }
  }, [chatLogData]);

  const handleScroll = () => {
    if (!parentRef || !parentRef.current) {
      return;
    }

    if (parentRef.current.scrollTop < 10) {
      setPrevScrollHeight(parentRef.current?.scrollHeight);
    }
  };

  const chatArrayFromChatLogData = useMemo(() => {
    if (chatLogData) {
      return Array.from(chatLogData);
    }
  }, [chatLogData]);

  const virtualizer = useVirtualizer({
    count: chatArrayFromChatLogData?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 10,
  });

  const items = virtualizer.getVirtualItems();

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

      <ChatDisplayContainer ref={parentRef} onScroll={() => handleScroll()}>
        <div ref={targetRef} />
        <div
          style={{
            height: virtualizer.getTotalSize(),
            width: '100%',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${items[0]?.start ?? 0}px)`,
            }}
          >
            {chatArrayFromChatLogData &&
              virtualizer.getVirtualItems().map((virtualRow) => {
                const index = virtualRow.index;
                const logId = chatArrayFromChatLogData[index][0];
                const { message, userId, type, time } = chatArrayFromChatLogData[index][1];

                return (
                  <div key={index} ref={virtualizer.measureElement} data-index={index}>
                    {!checkIsFirstChatToday(index, chatArrayFromChatLogData) && (
                      <DateDisplayWrapper>
                        <HorizontalLine />
                        <DateDisplay>{getStringByDate(new Date(time))}</DateDisplay>
                        <HorizontalLine />
                      </DateDisplayWrapper>
                    )}
                    <MessageBox
                      key={logId}
                      logId={logId}
                      message={message}
                      userId={userId}
                      type={type}
                      time={time}
                      isFirstChat={checkIsFirstChatFromUser(index, chatArrayFromChatLogData)}
                      isLastChat={checkIsLastChatFromUser(index, chatArrayFromChatLogData)}
                    />
                  </div>
                );
              })}
          </div>
        </div>
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
    contain: strict;
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
