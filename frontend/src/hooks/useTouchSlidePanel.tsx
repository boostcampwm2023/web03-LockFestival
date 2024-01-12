import { mobileMenuSelector } from '@store/chatRoom';
import { throttle } from '@utils/throttle';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const useTouchSlidePanel = (
  ref: React.RefObject<HTMLDivElement>,
  menuName: 'userListMenuSelected' | 'roomInfoMenuSelected'
) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [xPos, setXPos] = useState(0);
  const [menuState, setMenuState] = useRecoilState(mobileMenuSelector(menuName));

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setXPos(e.touches[0].clientX);
  };

  const handleTouchMove = throttle((e: React.TouchEvent) => {
    if (!isDragging) {
      return;
    }

    const deltaX = e.touches[0].clientX - xPos;
    setXPos(e.touches[0].clientX);

    if (ref.current instanceof HTMLElement) {
      const newLeft = ref.current.offsetLeft + deltaX;

      if (deltaX > 0 && newLeft > 0) {
        return;
      }

      ref.current.style.transition = 'left 0.2s linear';
      ref.current.style.left = `${newLeft}px`;
      ref.current.ontransitionend = () => {
        if (deltaX < 0 && ref.current instanceof HTMLElement) {
          ref.current.style.transition = 'left 0.3s ease-in';
          ref.current.style.left = `${-ref.current.offsetWidth}px`;
        }
        setIsClosing(true);
      };
    }
  }, 100);

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isClosing) {
      setTimeout(() => {
        setMenuState(false);
        if (ref.current) {
          ref.current.ontransitionend = null;
          ref.current.style.left = '0px';
        }
        setIsClosing(false);
      }, 500);
    }
  }, [isClosing]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (menuState === true) {
      ref.current.style.zIndex = '2';
    } else {
      ref.current.style.zIndex = '0';
    }
  }, [menuState]);

  return { menuState, handleTouchStart, handleTouchMove, handleTouchEnd };
};

export default useTouchSlidePanel;
