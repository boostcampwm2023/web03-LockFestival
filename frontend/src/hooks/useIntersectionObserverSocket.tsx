import { cursorLogIdAtom } from '@store/chatRoom';
import { RefObject, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

interface IntersectionObserverProps {
  targetRef: RefObject<HTMLElement>;
  eventHandler: (cursorId: string) => void;
}

const useIntersectionObserverSocket = ({ targetRef, eventHandler }: IntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver>();
  const cursorIdValue = useRecoilValue(cursorLogIdAtom);
  const cursorRef = useRef<string>('');

  useEffect(() => {
    cursorRef.current = cursorIdValue;
  }, [cursorIdValue]);

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
        threshold: 0.8,
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
