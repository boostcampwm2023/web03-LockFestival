import { useState } from 'react';
import tw, { css, styled } from 'twin.macro';

import HeadCard from './HeadCard/HeadCard';
import TailCard from './TailCard/TailCard';

import { GroupInfoCardProps } from 'types/recruitment';

const GroupInfoCard = (props: GroupInfoCardProps) => {
  const [isHead, setIsHead] = useState<boolean>(true);

  const handleClickFlipButton = () => {
    setIsHead((prev) => !prev);
  };

  return (
    <Container isHead={isHead}>
      {isHead ? (
        <HeadCard {...props} handleClickFlipButton={handleClickFlipButton} />
      ) : (
        <TailCard {...props} handleClickFlipButton={handleClickFlipButton} />
      )}
    </Container>
  );
};

const Container = styled.div<{ isHead: boolean }>(({ isHead }) => [
  tw`w-4/5 mx-auto px-4 py-2 text-white bg-gray-light font-pretendard rounded-[2rem]`,
  tw`desktop:(w-[48rem]) h-[34.4rem]`,
  css`
    position: relative;
    transition: transform 0.3s;
    transform: ${isHead
      ? 'perspective(800px) rotateY(0deg)'
      : 'perspective(800px) rotateY(180deg)'};
  `,
]);

export default GroupInfoCard;
