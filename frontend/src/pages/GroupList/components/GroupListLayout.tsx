import tw, { styled, css } from 'twin.macro';
import Group from './Group/Group';
import groupListMock from '@__mocks__/group/groupListMock';

const GroupListLayout = () => {
  return (
    <Container>
      <Group {...groupListMock[0]} />
      <Group {...groupListMock[1]} />
    </Container>
  );
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
