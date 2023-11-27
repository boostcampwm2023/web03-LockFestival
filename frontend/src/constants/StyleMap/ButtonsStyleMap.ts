import tw, { TwStyle } from 'twin.macro';
import { css } from '@emotion/react';
import { CSSInterpolation } from '@emotion/serialize';

const iconButtonBaseStyle: CSSInterpolation = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  vertical-align: middle;
  cursor: pointer;
`;

const basicButtonBaseStyle = (width: string | undefined): CSSInterpolation => css`
  width: ${width || 'fit-content'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  cursor: pointer;
`;

const iconStyleMap: Record<string, TwStyle[]> = {
  l: [
    tw`mobile:(w-[3.2rem] h-[3.2rem]) tablet:(w-[3.6rem] h-[3.6rem]) desktop:(w-[3.6rem] h-[3.6rem])`,
    {
      svg: tw`mobile:(w-[1.8rem] h-[1.8rem]) tablet:(w-[2.2rem] h-[2.2rem]) desktop:(w-[2.2rem] h-[2.2rem])`,
    },
  ],
  m: [
    tw`mobile:(w-[2.8rem] h-[2.8rem]) tablet:(w-[3.2rem] h-[3.2rem]) desktop:(w-[3.2rem] h-[3.2rem])`,
    {
      svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) tablet:(w-[1.8rem] h-[1.8rem]) desktop:(w-[1.8rem] h-[1.8rem])`,
    },
  ],
  s: [
    tw`mobile:(w-[2.4rem] h-[2.4rem]) tablet:(w-[2.8rem] h-[2.8rem]) desktop:(w-[2.8rem] h-[2.8rem])`,
    {
      svg: tw`mobile:(w-[1.2rem] h-[1.2rem]) tablet:(w-[1.5rem] h-[1.5rem]) desktop:(w-[1.5rem] h-[1.5rem])`,
    },
  ],
  default: [
    tw`mobile:(w-[2.8rem] h-[2.8rem]) tablet:(w-[3.2rem] h-[3.2rem]) desktop:(w-[3.2rem] h-[3.2rem])`,
    {
      svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) tablet:(w-[1.8rem] h-[1.8rem]) desktop:(w-[1.8rem] h-[1.8rem])`,
    },
  ],
};

export { iconStyleMap, iconButtonBaseStyle, basicButtonBaseStyle };
