import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import { genreList } from '@constants/themeGenres';
import { ModalProps } from 'types/modal';
import ThemeButton from './ThemeButton/ThemeButton';

interface StepTwoContentProps {
  selectGenre: Set<string>;
  setSelectGenre: (genre: string) => void;
  joinHandler: () => void;
}

function StepTwoContent({ selectGenre, setSelectGenre, joinHandler }: StepTwoContentProps) {
  const NOT_SELECT = 0;

  return (
    <>
      <TopWrapper>
        <JoinModalInfo>선호하시는 장르를 전부 선택해주세요.</JoinModalInfo>
        <ThemeButtonsContainer>
          {genreList.map((item, idx) => (
            <ThemeButton
              item={item}
              idx={idx}
              buttonHandler={setSelectGenre}
              isSelected={selectGenre.has(item.genre)}
            />
          ))}
        </ThemeButtonsContainer>
      </TopWrapper>
      <ButtonWrapper>
        <Button isIcon={false} onClick={joinHandler} disabled={selectGenre.size === NOT_SELECT}>
          <>완료</>
        </Button>
      </ButtonWrapper>
    </>
  );
}

export default StepTwoContent;

const TopWrapper = styled.div([
  css`
    display: flex;
    gap: 4rem;
    margin-top: 6.4rem;
    width: 54.2rem;
    height: 40rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `,
]);

const JoinModalInfo = styled.div([tw`font-maplestory text-l text-white`]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,
  tw`
    p-4
  `,
]);

const ThemeButtonsContainer = styled.div([
  css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  `,
]);
