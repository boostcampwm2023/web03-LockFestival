import { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { carouselConfig } from '@config/carouselConfig';
import tw, { styled, css } from 'twin.macro';

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  return (
    <CarouselContainer>
      <Slider {...carouselConfig}>{children}</Slider>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div([
  tw`w-full bg-gray-light rounded-default`,
  tw`desktop:(max-w-[102.4rem] h-[32.4rem])`,
  tw`mobile:(max-w-[43rem] h-[21.6rem])`,
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
  `,
]);

export default Carousel;
