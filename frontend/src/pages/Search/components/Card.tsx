import { ThemeDetailsData } from 'types/theme';
import tw, { styled, css } from 'twin.macro';
import HeadCard from './Card/HeadCard/HeadCard';
import TailCard from './Card/TailCard/TailCard';
import { useState } from 'react';

const Card = ({ theme }: { theme: ThemeDetailsData }) => {
  const [isHead, setIsHead] = useState<boolean>(true);

  const {
    themeName,
    themeId,
    brandBranchName,
    realGenre,
    posterImageUrl,
    difficulty,
    minMember,
    maxMember,
    playTime,
    website,
    phone,
    address,
  } = theme;

  const handleClickFlipButton = () => {
    setIsHead((prev) => !prev);
  };

  return (
    <Layout isHead={isHead}>
      {isHead ? (
        <HeadCard
          themeId={themeId}
          themeName={themeName}
          posterImageUrl={posterImageUrl}
          brandBranchName={brandBranchName}
          handleClickFlipButton={handleClickFlipButton}
        />
      ) : (
        <TailCard
          brandBranchName={brandBranchName}
          realGenre={realGenre}
          difficulty={difficulty}
          minMember={minMember}
          maxMember={maxMember}
          playTime={playTime}
          website={website}
          phone={phone}
          address={address}
          handleClickFlipButton={handleClickFlipButton}
        />
      )}
    </Layout>
  );
};

export default Card;

const Layout = styled.div<{ isHead: boolean }>(({ isHead }) => [
  tw`text-white bg-gray-light rounded-default p-4 h-[26rem] desktop:(w-[49%]) tablet:(mx-auto max-w-[47.5rem]) mobile:(mx-auto w-[100%] h-[20.4rem])`,
  css`
    display: flex;
    gap: 1.6rem;
    position: relative;
    transition: transform 0.3s;
    transform: ${isHead ? 'perspective(50%) rotateY(0deg)' : 'perspective(50%) rotateY(180deg)'};
  `,
]);
