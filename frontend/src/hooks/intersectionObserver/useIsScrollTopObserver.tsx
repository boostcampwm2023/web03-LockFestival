import { RefObject, useEffect, useRef } from 'react';

interface IntersectionObserverProps {
  targetRef: RefObject<HTMLElement>;
  eventHandler: (isIntersecting: boolean) => void;
}

const useIsScrollTopObserver = ({ targetRef, eventHandler }: IntersectionObserverProps) => {
  const observerRef = useRef<IntersectionObserver>();

  const checkIntersection: IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[]
  ) => {
    eventHandler(!entries[0].isIntersecting);
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

export default useIsScrollTopObserver;
