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
    smallRegion,
    bigRegion,
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
          smallRegion={smallRegion}
          bigRegion={bigRegion}
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
  tw`w-[47.5rem] h-[26rem] text-white bg-gray-light rounded-default p-4 gap-4 tablet:(mx-auto) mobile:(w-full h-[20.4rem] mx-auto)`,
  css`
    display: flex;
    position: relative;
    transition: transform 0.3s;
    transform: ${isHead ? 'perspective(50%) rotateY(0deg)' : 'perspective(50%) rotateY(180deg)'};
  `,
]);
