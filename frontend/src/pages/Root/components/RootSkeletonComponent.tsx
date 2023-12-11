import tw, { styled, css } from 'twin.macro';
import { keyframes } from '@emotion/react';

const RootSkeletonComponent = () => {
  const tabletBreakPoint = 1024;
  const mobileBreakPoint = 640;

  const calculateContainerCount = () => {
    return window.innerWidth > tabletBreakPoint ? 5 : window.innerWidth > mobileBreakPoint ? 4 : 3;
  };

  const skeletonCards = Array.from({ length: calculateContainerCount() }, (_, index) => (
    <SkeletonCard key={index} />
  ));

  return (
    <Container>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>{skeletonCards}</CardListContainer>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>{skeletonCards}</CardListContainer>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>{skeletonCards}</CardListContainer>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>{skeletonCards}</CardListContainer>
    </Container>
  );
};

const Container = styled.div([
  tw`w-full mx-auto`,
  tw`desktop:(max-w-[102.4rem])`,
  tw`tablet:(max-w-[70rem])`,
  tw`mobile:(max-w-[90%])`,
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  `,
]);

const CardListContainer = styled.div([
  tw`bg-gray-light rounded-default gap-[3.4rem]`,
  tw`desktop:(h-[32.4rem] px-3 py-4)`,
  tw`tablet:(max-w-[70rem] h-[27.8rem] px-3 py-4)`,
  tw`mobile:(max-w-[43rem] h-[24.8rem] px-2 py-4)`,
  css`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  `,
]);

const loadingAnimation = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(24rem);
  }
`;

const SkeletonLabel = styled.div([
  tw`rounded-default`,
  css`
    width: 8rem;
    height: 2.8rem;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;
    align-self: flex-start;
    margin-left: 1rem;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 55px;
      height: 100%;
      background: linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2);
      animation: ${loadingAnimation} 1s infinite linear;
      filter: blur(1px);
    }
  `,
]);

const SkeletonCard = styled.div`
  ${tw`mb-2 rounded-[1.5rem] bg-gray`}
  ${tw`desktop:(w-[17.1rem] p-3)`}
  ${tw`tablet:(w-[14rem]) p-3`}
  ${tw`mobile:(w-[12.6rem]) p-2`}
  background: #222222;
  position: relative;
  overflow: hidden;
  aspect-ratio: 9/15;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 55px;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(242, 242, 242, 0.6),
      rgba(221, 221, 221, 0.3),
      rgba(242, 242, 242, 0.6)
    );
    animation: ${loadingAnimation} 1s infinite linear;
    filter: blur(40px);
  }
`;

export default RootSkeletonComponent;
