import RootLayout from '@pages/Root/components/RootLayout';
import tw, { styled } from 'twin.macro';

function App() {
  return (
    <Container>
      <RootLayout />;
    </Container>
  );
}

const Container = styled.div([tw`bg-gray-dark h-screen`]);

export default App;
