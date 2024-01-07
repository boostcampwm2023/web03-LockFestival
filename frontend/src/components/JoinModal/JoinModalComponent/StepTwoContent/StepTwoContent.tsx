import tw, { styled, css } from 'twin.macro';
import Button from '@components/Button/Button';
import { genreList } from '@constants/themeGenres';
import ThemeButton from './ThemeButton/ThemeButton';

interface StepTwoContentProps {
  selectGenre: Set<string>;
  setSelectGenre: (genre: string) => void;
  joinHandler: () => void;
}

function StepTwoContent({ selectGenre, setSelectGenre, joinHandler }: StepTwoContentProps) {
  const NOT_SELECT = 0;

  return (
    <StepTwoContainer>
      <JoinModalInfo>선호하는 장르를 모두 선택해주세요.</JoinModalInfo>
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
      <ButtonWrapper>
        <Button isIcon={false} onClick={joinHandler} disabled={selectGenre.size === NOT_SELECT}>
          <>완료</>
        </Button>
      </ButtonWrapper>
    </StepTwoContainer>
  );
}

export default StepTwoContent;

const StepTwoContainer = styled.div([
  tw`w-[54.2rem] h-auto p-4 gap-10`,
  tw`mobile:(w-auto h-auto gap-6)`,
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `,
]);

const JoinModalInfo = styled.div([tw`font-maplestory text-l text-white mobile:(text-m)`]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,
]);

const ThemeButtonsContainer = styled.div([
  css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  `,
]);
