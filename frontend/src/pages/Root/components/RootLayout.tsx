import tw, { styled } from 'twin.macro';
import RandomThemeListContainer from './RandomThemeListContainer';
import GeoLocationThemeListContainer from './GeoLocationThemeListContainer';

const RootLayout = () => {
  return (
    <Container>
      <RandomThemeListContainer />
      <GeoLocationThemeListContainer />
    </Container>
  );
};

const Container = styled.div([tw`w-full mx-auto`, tw`desktop:(max-w-[102.4rem])`]);

export default RootLayout;
