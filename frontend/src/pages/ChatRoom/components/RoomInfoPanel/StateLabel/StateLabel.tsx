import Label from '@components/Label/Label';
import { styled, css } from 'twin.macro';
interface StateLabelProps {
  text: string;
  state: boolean;
}

const StateLabel = ({ text, state }: StateLabelProps) => {
  return (
    <Label isBorder={true} backgroundColor={state ? 'green-dark' : 'green-light'} width="10rem">
      <LabelText>
        {text}
        {state ? '완료' : '중'}
      </LabelText>
    </Label>
  );
};

const LabelText = styled.div([
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 0.4rem;
  `,
]);

export default StateLabel;
