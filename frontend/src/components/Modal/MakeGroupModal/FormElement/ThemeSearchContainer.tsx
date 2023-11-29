import Label from '@components/Label/Label';
import useSearchSimpleThemeQuery from '@hooks/query/useSearchSimpleThemeQuery';
import { Theme } from '@hooks/useCreateRecruitmentForm';
import useDebounceInput from '@hooks/useDebounceInput';
import tw, { css, styled } from 'twin.macro';

interface Props {
  theme: Theme | undefined;
  setTheme: React.Dispatch<React.SetStateAction<Theme | undefined>>;
}

const ThemeSearchContainer = ({ theme, setTheme }: Props) => {
  const { debounceQuery, realInputQuery, setRealInputQuery, resetQuery } = useDebounceInput(300);

  const { data, isSuccess } = useSearchSimpleThemeQuery(debounceQuery);

  const handleTheme = (e: React.MouseEvent<HTMLElement>, theme: Theme) => {
    setTheme(theme);
    resetQuery();
  };

  return (
    <>
      <Label isBorder={false} font="maplestory" size="l" width="12rem">
        <Text>선택한 테마</Text>
      </Label>
      <SearchContainer>
        <Input
          placeholder={theme?.themeName || '테마를 선택해주세요.'}
          value={realInputQuery}
          onChange={setRealInputQuery}
        />
        {realInputQuery && (
          <SearchContent>
            {!isSuccess && <SimpleText>검색중..</SimpleText>}
            {data?.length === 0 && <SimpleText>검색결과가 없습니다!..</SimpleText>}
            {data?.map((theme) => {
              return (
                <ThemeContainer key={theme.themeId} onClick={(e) => handleTheme(e, theme)}>
                  <ThemeImg src={theme.posterImageUrl} />
                  <div>
                    {theme.branchName} - {theme.themeName}
                  </div>
                </ThemeContainer>
              );
            })}
          </SearchContent>
        )}
      </SearchContainer>
    </>
  );
};

const SearchContainer = styled.div([
  css`
    position: relative;
  `,
]);

const SimpleText = styled.div([
  tw`h-[5rem]`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const SearchContent = styled.div([
  tw`w-[40rem] min-h-[5rem] max-h-[35rem] bg-gray-light rounded-[1rem] text-m border border-white border-solid`,
  css`
    z-index: 3;
    position: absolute;
    top: 4rem;
    left: 0rem;
    overflow-y: scroll;

    ::-webkit-scrollbar {
      width: 1rem;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #f2f2f2;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-track {
      background-color: #222222;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  `,
]);

const ThemeContainer = styled.div([
  tw`w-auto h-[8rem] m-[1rem]`,
  css`
    display: flex;
    align-items: center;
    column-gap: 2rem;

    cursor: pointer;
  `,
]);

const Input = styled.input([
  tw`font-pretendard w-[24rem] h-[3.6rem] bg-white rounded-[2rem] pl-[1rem] text-l`,
]);

const Text = styled.div([tw`mx-auto`]);

const ThemeImg = styled.img([tw`h-[4.5rem] w-[4.5rem]`]);

export default ThemeSearchContainer;
