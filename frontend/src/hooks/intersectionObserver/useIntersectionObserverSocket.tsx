import { chatLogAtom } from '@store/chatRoom';
import { RefObject, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

interface IntersectionObserverProps {
  targetRef: RefObject<HTMLElement>;
  eventHandler: (cursorId: string) => void;
  roomId: string;
}

const useIntersectionObserverSocket = ({
  targetRef,
  eventHandler,
  roomId,
}: IntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver>();
  const chatLog = useRecoilValue(chatLogAtom);
  const firstChatId = chatLog[roomId]?.entries()?.next()?.value?.[0] || '';

  const cursorRef = useRef<string>('');

  useEffect(() => {
    if (firstChatId) {
      cursorRef.current = firstChatId;
    }
  }, [firstChatId]);

  const checkIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    if (entries[0].isIntersecting) {
      eventHandler(cursorRef.current);
    }
  };

  useEffect(() => {
    if (targetRef.current) {
      observerRef.current = new IntersectionObserver(checkIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.9,
      });

      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetRef]);
};

export default useIntersectionObserverSocket;
