import tw, { styled, css } from 'twin.macro';
import RandomThemeListContainer from './RandomThemeListContainer';
import GeoLocationThemeListContainer from './GeoLocationThemeListContainer';
import { Suspense } from 'react';
import RootSkeletonComponent from './RootSkeletonComponent';
import { Helmet } from 'react-helmet-async';

const RootLayout = () => {
  return (
    <Container>
      <Helmet>
        <title>Lock Festival 메인페이지</title>
      </Helmet>
      <Suspense fallback={<RootSkeletonComponent />}>
        <RandomThemeListContainer />
        <GeoLocationThemeListContainer />
      </Suspense>
    </Container>
  );
};

const Container = styled.div([
  tw`w-full mx-auto mt-[4rem]`,
  tw`desktop:(max-w-[102.4rem] pb-[10rem])`,
  tw`tablet:(max-w-[78rem])`,
  tw`mobile:(max-w-[80%])`,
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  `,
]);

export default RootLayout;
