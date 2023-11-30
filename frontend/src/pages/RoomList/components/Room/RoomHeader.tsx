import tw, { styled, css } from 'twin.macro';
import { GroupProps } from 'types/group';

const RoomHeader = ({
  posterImageUrl,
  branchName,
  themeName,
}: Pick<GroupProps, 'posterImageUrl' | 'branchName' | 'themeName'>) => {
  return (
    <Container>
      <Image src={posterImageUrl} alt="theme" />
      <Contents>
        <Title>{branchName}</Title>
        <Name>{themeName}</Name>
      </Contents>
    </Container>
  );
};

const Container = styled.div([
  tw`max-w-[28rem] w-[28rem] h-[10.4rem] p-2 gap-x-4 rounded-[2rem] bg-gray font-pretendard`,
  tw`tablet:(w-[95%])`,
  tw`mobile:(w-auto)`,
  css`
    display: flex;
    align-items: center;
    flex-shrink: 0;
  `,
]);

const Image = styled.img([
  tw`w-[7.2rem] h-[7.2rem] rounded-[1rem]`,
  css`
    flex-shrink: 0;
  `,
]);

const Contents = styled.div([tw`text-s`, tw`mobile:(hidden)`]);

const Name = styled.div([tw`pt-2`]);

const Title = styled.div([]);

export default RoomHeader;
