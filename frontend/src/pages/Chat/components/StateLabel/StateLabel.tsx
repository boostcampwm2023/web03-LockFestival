import Label from '@components/Label/Label';
import { styled, css } from 'twin.macro';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { FaRegCircleXmark } from 'react-icons/fa6';

interface StateLabelProps {
  text: string;
  state: boolean;
}

const StateLabel = ({ text, state }: StateLabelProps) => {
  return (
    <Label isBorder={true} backgroundColor={state ? 'green-light' : 'green-dark'} width="10rem">
      <LabelText>
        {text}
        {state ? <FaRegCircleCheck /> : <FaRegCircleXmark />}
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
