import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { ReactNode } from 'react';
import Slider from 'react-slick';
import tw, { styled, css } from 'twin.macro';
import { useSetRecoilState } from 'recoil';
import { carouselConfig } from '@config/carouselConfig';
import isSwipingAtom from '@store/isSwipingAtom';

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const setIsSwiping = useSetRecoilState(isSwipingAtom);

  const updateSwipeState = (state: boolean) => {
    setIsSwiping(state);
  };

  return (
    <CarouselContainer>
      <Slider
        afterChange={() => updateSwipeState(false)}
        onSwipe={() => updateSwipeState(true)}
        {...carouselConfig}
      >
        {children}
      </Slider>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div([
  tw`w-full bg-gray-light rounded-default py-3`,
  tw`desktop:(max-w-[102.4rem] h-[32.4rem])`,
  tw`tablet:(max-w-[70rem] h-[27.8rem])`,
  tw`mobile:(max-w-[43rem] h-[25rem])`,
  css`
    overflow: hidden;
  `,
]);

export default Carousel;
