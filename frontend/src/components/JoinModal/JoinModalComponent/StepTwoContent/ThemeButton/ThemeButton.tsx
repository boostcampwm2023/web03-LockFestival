import tw, { styled, css } from 'twin.macro';

interface ThemeButtonProps {
  item: { thumbnail: string; genre: string };
  idx: number;
  buttonHandler: (idx: number) => void;
  isSelected: boolean;
}

function ThemeButton({ item, idx, buttonHandler, isSelected }: ThemeButtonProps) {
  return (
    <ThemeButtonWrapper key={idx} onClick={() => buttonHandler(idx)} isSelected={isSelected}>
      <SelectedState isSelected={isSelected}></SelectedState>
      <ThemeImg src={item.thumbnail} alt="genreImg" />
      <ThemeGenre isSelected={isSelected}>{item.genre}</ThemeGenre>
    </ThemeButtonWrapper>
  );
}

export default ThemeButton;

const ThemeButtonWrapper = styled.div<Pick<ThemeButtonProps, 'isSelected'>>(({ isSelected }) => {
  const backgroundColor = isSelected ? tw`bg-gray-dark` : tw`bg-white`;
  return [
    backgroundColor,
    tw`rounded-[2rem]`,
    css`
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      width: 11.8rem;
      height: 16rem;
      cursor: pointer;
    `,
  ];
});

const ThemeImg = styled.img([
  tw`rounded-[2rem]`,
  css`
    width: 9rem;
    height: 10rem;
    margin-top: 1rem;
  `,
]);

const SelectedState = styled.div<Pick<ThemeButtonProps, 'isSelected'>>(({ isSelected }) => {
  const backgroundColor = isSelected ? tw`bg-green-light` : tw`bg-white`;

  return [
    backgroundColor,
    tw`rounded-[50%]`,
    css`
      position: absolute;
      width: 1.2rem;

      height: 1.2rem;
      top: 1rem;
      right: 1rem;
    `,
  ];
});

const ThemeGenre = styled.div<Pick<ThemeButtonProps, 'isSelected'>>(({ isSelected }) => {
  const fontColor = isSelected ? tw`text-white` : tw`text-gray-dark`;
  return [fontColor, tw`font-pretendard text-s-bold`];
});
