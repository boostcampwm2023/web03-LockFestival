import { ThemeDetailsData } from 'types/theme';
import tw, { styled, css } from 'twin.macro';
import HeadCard from './Card/HeadCard/HeadCard';
import TailCard from './Card/TailCard/TailCard';
import { useState } from 'react';

const Card = ({ theme }: { theme: Omit<ThemeDetailsData, 'otherThemes'> }) => {
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
  tw`w-[48%] text-white bg-gray-light rounded-default p-4`,
  css`
    display: flex;
    gap: 1.6rem;
    position: relative;
    transition: transform 0.3s;
    transform: ${isHead ? 'perspective(50%) rotateY(0deg)' : 'perspective(50%) rotateY(180deg)'};
    height: 28rem;
  `,
]);
