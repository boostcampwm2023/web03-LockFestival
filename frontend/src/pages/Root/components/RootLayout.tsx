import tw, { styled, css } from 'twin.macro';
import RandomThemeListContainer from './RandomThemeListContainer';
import GeoLocationThemeListContainer from './GeoLocationThemeListContainer';
import { Suspense } from 'react';
import RootSkeletonComponent from './RootSkeletonComponent';

const RootLayout = () => {
  return (
    <Container>
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
  css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  `,
]);

export default RootLayout;
