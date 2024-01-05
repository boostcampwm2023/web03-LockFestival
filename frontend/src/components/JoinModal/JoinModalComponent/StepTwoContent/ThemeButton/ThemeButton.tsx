import tw, { styled, css } from 'twin.macro';

interface ThemeButtonProps {
  item: { thumbnail: string; genre: string };
  idx: number;
  buttonHandler: (genre: string) => void;
  isSelected: boolean;
}

function ThemeButton({ item, idx, buttonHandler, isSelected }: ThemeButtonProps) {
  return (
    <ThemeButtonWrapper key={idx} onClick={() => buttonHandler(item.genre)} isSelected={isSelected}>
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
    tw`w-[100%] p-2 rounded-[1.5rem] gap-2`,
    tw`mobile:(p-1.5 rounded-[0.8rem])`,
    css`
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    `,
  ];
});

const ThemeImg = styled.img([
  tw`rounded-[1rem] mobile:(rounded-[0.4rem])`,
  css`
    width: 100%;
    aspect-ratio: 9/13;
  `,
]);

const SelectedState = styled.div<Pick<ThemeButtonProps, 'isSelected'>>(({ isSelected }) => {
  const backgroundColor = isSelected ? tw`bg-green-light` : tw`bg-white`;

  return [
    backgroundColor,
    tw`absolute rounded-[50%] w-[0.8rem] h-[0.8rem] top-3.5 right-3.5`,
    tw`mobile:(w-[0.6rem] h-[0.6rem] top-2.5 right-2.5)`,
  ];
});

const ThemeGenre = styled.div<Pick<ThemeButtonProps, 'isSelected'>>(({ isSelected }) => {
  const fontColor = isSelected ? tw`text-white` : tw`text-gray-dark`;
  return [fontColor, tw`font-pretendard text-s-bold mobile:(text-xs-bold)`];
});
