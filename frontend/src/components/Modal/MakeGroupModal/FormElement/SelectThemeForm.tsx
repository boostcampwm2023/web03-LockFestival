import { Theme } from '@hooks/useCreateRecruitmentForm';
import tw, { styled, css } from 'twin.macro';

interface Props {
  theme: Theme | undefined;
}

const SelectThemeForm = ({ theme }: Props) => {
  return (
    <Container>
      {theme && (
        <SelectThemeContainer>
          <Title>선택한 테마</Title>
          <SelectImg src={theme.posterImageUrl}></SelectImg>
          <Text>[{theme.BranchName}]</Text>
          <Text>{theme.themeName}</Text>
        </SelectThemeContainer>
      )}
    </Container>
  );
};

const Container = styled.div([
  tw`w-full font-pretendard`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

const SelectThemeContainer = styled.div([
  tw`text-m`,
  css`
    display: flex;
    align-items: center;
    flex-direction: column;
  `,
]);

const Title = styled.div([tw`text-xl my-[2rem]`]);

const SelectImg = styled.img([tw`w-[8rem] h-[12rem]`]);

const Text = styled.div([tw`text-m mt-[2rem]`]);

export default SelectThemeForm;
