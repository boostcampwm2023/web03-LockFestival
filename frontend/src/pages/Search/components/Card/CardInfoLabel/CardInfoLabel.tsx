import Label from '@components/Label/Label';
import tw, { styled, css } from 'twin.macro';

interface Props {
  labelName: string;
  labelContent: JSX.Element;
}

const CardInfoLabel = ({ labelName, labelContent }: Props) => {
  return (
    <LabelWrapper>
      <Label isBorder={false} size="l" width="10rem">
        <Text>{labelName}</Text>
      </Label>
      <LabelContent>{labelContent}</LabelContent>
    </LabelWrapper>
  );
};

export default CardInfoLabel;

const LabelWrapper = styled.div([
  css`
    display: flex;
    gap: 1.2rem;
  `,
]);

const Text = styled.div([tw`m-auto`]);

const LabelContent = styled.div([
  tw`font-pretendard text-l text-white`,
  css`
    display: flex;
    align-items: center;
  `,
]);
