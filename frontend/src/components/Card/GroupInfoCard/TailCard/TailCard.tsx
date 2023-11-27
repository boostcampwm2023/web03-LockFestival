import tw, { css, styled } from 'twin.macro';
import { HeadCardProps } from '../HeadCard/HeadCard';
import Label from '@components/Label/Label';
import { useNavigate } from 'react-router-dom';

const TailCard = ({ writer, etc, theme, handleClickFlipButton }: HeadCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = (isEnter: boolean, groudId: string) => {
    if (!isEnter) {
      navigate(`chat/${groudId}`);
    }
  };

  return (
    <Container>
      <ThemeInfo>
        <List>
          <Label isBorder={true} size="l" font="pretendard">
            <LabelText>전화번호</LabelText>
          </Label>
          <Text>{theme.phone}</Text>
        </List>
        <List>
          <Label isBorder={true} size="l" font="pretendard">
            <LabelText>주소</LabelText>
          </Label>
          <Text>{theme.address}</Text>
        </List>
        <List>
          <Label isBorder={true} size="l" font="pretendard">
            <LabelText>인원</LabelText>
          </Label>
          <Text>{theme.personnel}</Text>
        </List>
        <List>
          <Label isBorder={true} size="l" font="pretendard">
            <LabelText>플레이타임</LabelText>
          </Label>
          <Text>{theme.playTime}</Text>
        </List>
        <List>
          <Label isBorder={true} size="l" font="pretendard">
            <LabelText>장르</LabelText>
          </Label>
          <Text>{theme.genre}</Text>
        </List>
      </ThemeInfo>
      <ButtonContainer>
        <Button onClick={handleClickFlipButton}>돌아가기</Button>
        <Button isEnter={etc.isEnter} onClick={() => handleNavigate(etc.isEnter, etc.groupId)}>
          입장하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div([
  tw`h-full text-l`,
  css`
    position: relative;
    transform: rotateY(180deg);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
]);

const ThemeInfo = styled.div([]);

const List = styled.div([
  tw`my-2`,
  tw`mobile:(my-6)`,
  css`
    display: flex;
    align-items: center;
    column-gap: 2.4rem;
  `,
]);

const ButtonContainer = styled.div([
  css`
    position: absolute;
    bottom: 0.4rem;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    column-gap: 1.6rem;
  `,
]);

const LabelText = styled.div([
  tw`w-[8rem] text-l`,
  tw`mobile:(w-[5.6rem] text-s)`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const Button = styled.button<{ isEnter?: boolean }>(({ isEnter }) => [
  tw`text-white bg-transparent font-pretendard`,
  css`
    cursor: ${isEnter ? 'not-allowed' : 'pointer'};
    color: ${isEnter && '#525252'};
    &:hover {
      text-decoration: underline;
      text-underline-position: under;
    }
  `,
]);

const Text = styled.span([tw`font-pretendard`, tw`mobile:(text-m)`]);

export default TailCard;