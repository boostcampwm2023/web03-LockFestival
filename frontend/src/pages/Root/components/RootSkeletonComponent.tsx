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
  tw`w-[90vw]`,
  tw`desktop:(max-w-[102.4rem])`,
  tw`tablet:(max-w-[70rem])`,
  tw`mobile:(max-w-[36rem])`,
  css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
]);

const CardListContainer = styled.div([
  tw`w-full bg-gray-light rounded-default mb-4 py-3`,
  tw`desktop:(h-[32.4rem])`,
  tw`tablet:(h-[27.8rem])`,
  tw`mobile:(h-[20.6rem])`,
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
  tw`h-[3.6rem] rounded-default mt-2`,
  tw`mobile:(h-[3.2rem])`,
  tw`border-[0.3rem] border-solid border-gray-light`,
  css`
    width: 6rem;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;
    align-self: flex-start;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 100%;
      background: linear-gradient(to right, #999999, #8f8f8fa0, #999999);
      animation: ${loadingAnimation} 2s infinite linear;
      filter: blur(10px);
    }
  `,
]);

const SkeletonCard = styled.div`
  ${tw`mx-auto mb-[1.5rem] rounded-[1.5rem] bg-gray`}
  ${tw`desktop:(w-[17rem])`}
  ${tw`tablet:(w-[15.2rem])`}
  ${tw`mobile:(w-[10.8rem])`}
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
