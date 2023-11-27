import tw, { styled, css } from 'twin.macro';

import Label from '@components/Label/Label';
import { getStringByDate } from '@utils/dateUtil';

import { HeadCardProps } from './HeadCard';
import { FaRegUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const HeadCardContent = ({ theme, etc, handleClickFlipButton }: Omit<HeadCardProps, 'writer'>) => {
  const navigate = useNavigate();

  const handleNavigate = (isEnter: boolean, groudId: string) => {
    if (!isEnter) {
      navigate(`chat/${groudId}`);
    }
  };

  return (
    <Content>
      <ThemeCard>
        <ThemeImg src={theme.themeUrl} />
      </ThemeCard>
      <ThemeContent>
        <ThemeInfo>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>지점</LabelText>
            </Label>
            <Text>{theme.zizum}</Text>
          </List>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>날짜</LabelText>
            </Label>
            <Text>{getStringByDate(theme.date)}</Text>
          </List>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>인원</LabelText>
            </Label>
            <Text>
              {Array.from({ length: theme.curCount }, (_) => (
                <Circle isCur={true}>
                  <FaRegUser size={10} color="#40B753" />
                </Circle>
              ))}
              {Array.from({ length: theme.maxCount - theme.curCount }, (_) => (
                <Circle isCur={false}>
                  <FaRegUser size={10} color="#525252" />
                </Circle>
              ))}
            </Text>
          </List>
          <List>
            <Label isBorder={true} size="l" font="pretendard">
              <LabelText>상태</LabelText>
            </Label>
            <Text>
              <LabelContainer>
                <Label
                  isBorder={false}
                  size="s"
                  backgroundColor={theme.isRevervation ? 'green-dark' : 'green-light'}
                >
                  <>{theme.isRevervation ? '예약완료' : '예약중'}</>
                </Label>
                <Label
                  isBorder={false}
                  size="s"
                  backgroundColor={theme.isRecruitment ? 'green-dark' : 'green-light'}
                >
                  <>{theme.isRecruitment ? '모집완료' : '모집중'}</>
                </Label>
              </LabelContainer>
            </Text>
          </List>
          <TitleText>{theme.title}</TitleText>
        </ThemeInfo>
        <ButtonContainer>
          <Button onClick={handleClickFlipButton}>상세보기</Button>
          <Button isEnter={etc.isEnter} onClick={() => handleNavigate(etc.isEnter, etc.groupId)}>
            입장하기
          </Button>
        </ButtonContainer>
      </ThemeContent>
    </Content>
  );
};

const Content = styled.div([
  tw`text-m mt-2 gap-x-2`,
  tw`tablet:(gap-x-4 justify-evenly)`,
  tw`mobile:(flex-col)`,
  css`
    display: flex;
  `,
]);

const ThemeCard = styled.div([
  tw`w-[17.6rem] h-[28rem] bg-gray rounded-[2rem]`,
  tw`mobile:(w-[14rem] h-[22.4rem] mx-auto)`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const ThemeImg = styled.img([
  tw`rounded-[0.5rem] w-[15.2rem] h-[24.32rem]`,
  tw`mobile:(w-[12rem] h-[19.2rem])`,
]);

const ThemeContent = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
]);

const ThemeInfo = styled.div([]);

const List = styled.div([
  tw`mb-2 gap-x-8`,
  tw`tablet:(gap-x-10)`,
  tw`mobile:(gap-x-3)`,
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

const LabelText = styled.div([
  tw`w-[4.8rem] text-l`,
  tw`mobile:(w-[3.2rem] text-m)`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const Circle = styled.span<{ isCur: boolean }>(({ isCur }) => [
  tw`(w-[2rem] h-[2rem] mr-1) rounded-full border-[0.1rem] border-white border-solid`,
  css`
    border: 1px solid ${isCur ? '#40B753' : '#525252'};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const Text = styled.div([
  tw`font-pretendard`,
  tw`mobile:(text-m)`,
  css`
    display: flex;
    align-items: center;
  `,
]);

const TitleText = styled.div([
  tw`border-[0.1rem] border-white border-solid rounded-[1.5rem] px-2 py-1 h-[8rem] w-[25.6rem]`,
  tw`tablet:(max-w-[35.2rem] w-full)`,
  css`
    display: flex;
    align-items: center;
    justify-self: center;
  `,
]);

const LabelContainer = styled.div([
  css`
    display: flex;
    align-items: center;
    column-gap: 1rem;
  `,
]);

export default HeadCardContent;