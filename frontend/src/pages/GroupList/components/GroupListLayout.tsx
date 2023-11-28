import tw, { styled, css } from 'twin.macro';

const GroupListLayout = () => {
  return <Container></Container>;
};
export default GroupListLayout;

const Container = styled.div([
  tw`w-full mx-auto`,
  tw`desktop:(max-w-[102.4rem])`,
  css`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  `,
]);
