import { keyframes } from '@emotion/react';
import tw, { styled, css } from 'twin.macro';

const EnterDisplay = () => {
  return <BlinkText>참여중인 방</BlinkText>;
};

export default EnterDisplay;

const blink = keyframes`
  0% {
      opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const BlinkText = styled.div([
  css`
    animation: ${blink} 2s infinite;
  `,
  tw`font-pretendard text-l text-green-light`,
]);
