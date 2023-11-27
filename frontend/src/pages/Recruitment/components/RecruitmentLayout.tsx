import tw, { css, styled } from 'twin.macro';

const RecruitmentLayout = () => {
  return <Container></Container>;
};

const Container = styled.div([
  tw`w-full mx-auto grid-cols-1 w-4/5`,
  tw`desktop:(w-[102.4rem] grid-cols-2)`,
  css`
    display: grid;
    justify-content: center;
    align-items: center;
    row-gap: 2rem;
  `,
]);

export default RecruitmentLayout;
