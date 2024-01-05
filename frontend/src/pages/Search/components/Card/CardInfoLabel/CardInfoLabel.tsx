import Label from '@components/Label/Label';
import tw, { styled, css } from 'twin.macro';

interface Props {
  labelName: string;
  labelContent: JSX.Element;
}

const CardInfoLabel = ({ labelName, labelContent }: Props) => {
  const labelWidth = labelName === '지점' || labelName === '테마명' ? '5.8rem' : '9rem';

  return (
    <LabelWrapper>
      <Label isBorder={false} size="m" width={labelWidth}>
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
    width: 100%;
  `,
]);

const Text = styled.div([tw`m-auto`]);

const LabelContent = styled.div([
  tw`font-pretendard text-m text-white mobile:(text-s text-center)`,
  css`
    display: flex;
    flex: 1;
    align-items: center;
  `,
]);
