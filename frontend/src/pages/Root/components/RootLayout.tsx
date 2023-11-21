import tw, { styled } from 'twin.macro';
import RandomThemeListContainer from './RandomThemeListContainer';

const RootLayout = () => {
  return (
    <Container>
      <RandomThemeListContainer />
    </Container>
  );
};

const Container = styled.div([tw`w-full mx-auto`, tw`desktop:(max-w-[102.4rem])`]);

export default RootLayout;
