import tw, { styled, css } from 'twin.macro';
import Label from '@components/Label/Label';

interface Props {
  isRecruitment: boolean;
  setIsRecruitment: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecruitmentContainer = ({ isRecruitment, setIsRecruitment }: Props) => {
  return (
    <>
      <Label isBorder={false} font="maplestory" size="l" width="12rem">
        <Text>모집 여부</Text>
      </Label>
      <Button isSelected={isRecruitment === true} onClick={() => setIsRecruitment(true)}>
        모집 완료
      </Button>
      <Button isSelected={isRecruitment === false} onClick={() => setIsRecruitment(false)}>
        모집 중
      </Button>
    </>
  );
};

const Text = styled.div([tw`mx-auto`]);

const Button = styled.button<{ isSelected: boolean }>(({ isSelected }) => [
  tw`w-[10rem] h-[2.8rem] text-gray-dark text-l font-pretendard rounded-[2rem]`,
  css`
    background-color: ${isSelected ? '#1AB93D' : '#1F371D'};
    cursor: pointer;
  `,
]);

export default RecruitmentContainer;
