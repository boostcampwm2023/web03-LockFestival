import tw, { TwStyle } from 'twin.macro';
import { css } from '@emotion/react';

const LabelBaseStyle = (width: string | undefined): Record<string, any> => css`
  width: ${width || 'fit-content'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const colorStyleMap: Record<string, TwStyle> = {
  'white': tw`bg-white`,
  'green-light': tw`bg-green-light`,
  'green-dark': tw`bg-green-dark`,
  'default': tw`bg-white`,
};

export { colorStyleMap, LabelBaseStyle };
