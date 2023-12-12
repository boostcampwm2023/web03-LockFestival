import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import { FaRightFromBracket } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { chatLogAtom, chatUnreadAtom, userListInfoAtom } from 'store/chatRoom';
import { ChatLog } from 'types/chat';
import MessageBox from './MessageBox/MessageBox';
import { useEffect, useMemo, useRef, useState, useCallback, memo } from 'react';
import useIntersectionObserverSocket from '@hooks/intersectionObserver/useIntersectionObserverSocket';
import { getStringByDate } from '@utils/dateUtil';
import {
  checkIsFirstChatFromUser,
  checkIsFirstChatToday,
  checkIsLastChatFromUser,
} from '@utils/chatMessageUtil';
import useIsScrollTopObserver from '@hooks/intersectionObserver/useIsScrollTopObserver';
import { useVirtualizer } from '@tanstack/react-virtual';
import { throttle } from '@utils/throttle';
import PopUpMessageBox from './PopUpMessageBox/PopUpMessageBox';
import InputBox from './InputBox/InputBox';
interface ChatPanelProps {
  roomId: string;
  sendChat: (message: string) => void;
  getPastChat: (cursorId: string) => void;
}

interface UnreadState extends ChatLog {
  isRead: boolean;
  logId: string;
}

const ChatPanel = memo(function ChatPanel({ roomId, sendChat, getPastChat }: ChatPanelProps) {
  const navigate = useNavigate();
  const chatLogData: Map<string, ChatLog> = useRecoilValue(chatLogAtom)[roomId];
  const userListInfo = useRecoilValue(userListInfoAtom);
  const targetRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef<HTMLDivElement>(null);
  const [isScrollToTop, setIsScrollToTop] = useState<boolean>(false);
  const [lastUnreadChat, setLastUnreadChat] = useState<UnreadState>();
  const [prevChatLogDataSize, setPrevChatLogDataSize] = useState<number>(0);
  const PAGING_SIZE = 50;
  const MIN_SCROLL_TOP = 50;
  const LAST_INDEX = -1;

  useIntersectionObserverSocket({
    eventHandler: getPastChat,
    targetRef,
    roomId,
  });

  useIsScrollTopObserver({
    eventHandler: setIsScrollToTop,
    targetRef: lastScrollRef,
  });

  const chatArrayFromChatLogData = useMemo(() => {
    if (chatLogData) {
      return Array.from(chatLogData);
    }
  }, [chatLogData]);

  useEffect(() => {
    const processLastChat = (isRead: boolean) => {
      const lastChat = chatArrayFromChatLogData?.at(LAST_INDEX);

      if (!lastChat) {
        return;
      }

      const [logId, chatData] = lastChat;

      if (chatData.type !== 'message' || userListInfo?.get(chatData.userId)?.isMe) {
        return;
      }

      if (!lastUnreadChat || lastUnreadChat.logId !== logId) {
        setLastUnreadChat({ ...chatData, isRead, logId });
      }
    };

    if (!isScrollToTop) {
      lastScrollRef?.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
      processLastChat(true);
    } else {
      processLastChat(false);
    }
  }, [chatLogData]);

  useEffect(() => {
    if (!isScrollToTop) {
      return;
    }

    const pastChatSize = chatLogData.size - prevChatLogDataSize;

    if (pastChatSize === 1 || (pastChatSize < PAGING_SIZE && prevChatLogDataSize === 0)) {
      return;
    }

    if (pastChatSize < PAGING_SIZE && prevChatLogDataSize !== 0) {
      virtualizer.scrollToIndex(pastChatSize, { align: 'end' });
      return;
    }

    if (pastChatSize === PAGING_SIZE) {
      virtualizer.scrollToIndex(PAGING_SIZE, { align: 'start' });
      return;
    }
  }, [chatLogData, prevChatLogDataSize]);

  useEffect(() => {
    if (!isScrollToTop && lastUnreadChat) {
      setLastUnreadChat({ ...lastUnreadChat, isRead: true });
    }
  }, [isScrollToTop]);

  const handleScroll = throttle(() => {
    if (!parentRef || !parentRef.current) {
      return;
    }

    if (parentRef.current.scrollTop < MIN_SCROLL_TOP) {
      setPrevChatLogDataSize(chatLogData.size);
    }
  }, 500);

  const virtualizer = useVirtualizer({
    count: chatArrayFromChatLogData?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 200,
    overscan: 10,
  });

  const items = virtualizer.getVirtualItems();

  const chatUnread = useRecoilValue(chatUnreadAtom);

  const chatUnreadSortArray = useMemo(() => {
    return new Array(...chatUnread).sort(([key1], [key2]) => {
      return key1.localeCompare(key2);
    });
  }, [chatUnread]);

  const unreadCount = useCallback(
    (logId: string) => {
      if (!chatUnread) {
        return 0;
      }

      for (let i = 0; i < chatUnreadSortArray.length; i++) {
        if (logId <= chatUnreadSortArray[i][1]) {
          if (i === 0) {
            return 0;
          }
          return Number(chatUnreadSortArray[i - 1][0]);
        }
      }

      if (chatUnreadSortArray.length === 0) {
        return 0;
      }

      return Number(chatUnreadSortArray[chatUnreadSortArray.length - 1][0]);
    },
    [chatUnread]
  );

  return (
    <Layout>
      <ButtonWrapper>
        <Button
          isIcon={true}
          onClick={() => {
            navigate('/room-list');
          }}
        >
          <FaRightFromBracket />
        </Button>
      </ButtonWrapper>
      <ChatLayout>
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
                      {checkIsFirstChatToday(index, chatArrayFromChatLogData) && (
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
                        unreadCount={unreadCount(logId)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          <div ref={lastScrollRef}></div>
        </ChatDisplayContainer>
        {isScrollToTop && lastUnreadChat && !lastUnreadChat.isRead && (
          <LatestUnreadChat
            onClick={() => {
              setLastUnreadChat({ ...lastUnreadChat, isRead: true });
              lastScrollRef?.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
            }}
          >
            <PopUpMessageBox message={lastUnreadChat.message} userId={lastUnreadChat.userId} />
          </LatestUnreadChat>
        )}
      </ChatLayout>
      <InputBox setIsScrollToTop={setIsScrollToTop} sendChat={sendChat} />
    </Layout>
  );
});

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

const ChatLayout = styled.div([
  tw`w-[100%] h-[100%]`,
  css`
    position: relative;
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
    }

    ::-webkit-scrollbar-track {
      background-color: #222222;
    }
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

const LatestUnreadChat = styled.div([
  tw`w-[calc(100% - 1rem)] h-[4rem] bg-white font-pretendard text-m border-t border-solid border-border-default`,
  css`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    position: absolute;
    left: 0;
    bottom: 0rem;
    border-bottom-left-radius: 1rem;
  `,
]);

export default ChatPanel;
