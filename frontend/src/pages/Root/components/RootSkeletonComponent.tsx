import tw, { styled, css } from 'twin.macro';
import { keyframes } from '@emotion/react';

const RootSkeletonComponent = () => {
  return (
    <>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </CardListContainer>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </CardListContainer>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </CardListContainer>
      <SkeletonLabel></SkeletonLabel>
      <CardListContainer>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </CardListContainer>
    </>
  );
};

const CardListContainer = styled.div([
  tw`bg-gray-light rounded-default `,
  tw`desktop:(px-4 h-[32.4rem])`,
  tw`mobile:(px-2  h-[21.6rem])`,
  css`
    display: flex;
    align-items: center;
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
    width: 10rem;
    height: 3.2rem;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;

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
  ${tw`desktop:(w-[16.8rem] h-[26.4rem])`}
  ${tw`mobile:(w-[10rem] h-[16rem])`}
  background: #222222;
  position: relative;
  overflow: hidden;

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
