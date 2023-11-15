import tw, { TwStyle } from 'twin.macro';
import { css } from '@emotion/react';

const iconButtonBaseStyle: Record<string, any> = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 1px solid white;
  vertical-align: middle;
  cursor: pointer;
`;

const basicButtonBaseStyle = (width: string | undefined): Record<string, any> => css`
  width: ${width || 'fit-content'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid white;
  cursor: pointer;
`;

const fontStyleMap: Record<string, TwStyle> = {
  dnfbit: tw`font-dnfbit`,
  jua: tw`font-jua`,
  gsans: tw`font-gsans`,
  default: tw`font-gsans`,
};

const sizeStyleMap: Record<string, TwStyle[]> = {
  l: [
    tw`mobile:(text-m px-2.5 py-1.5 h-[3.2rem]) desktop:(text-l px-3 py-2 h-[3.6rem])`,
    { svg: tw`mobile:(w-[1.8rem] h-[1.8rem]) desktop:(w-[2rem] h-[2rem])` },
  ],
  m: [
    tw`mobile:(text-s px-2 py-1 h-[2.8rem]) desktop:(text-m px-2.5 py-1.5) h-[3.2rem]`,
    { svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) desktop:(w-[1.8rem] h-[1.8rem])` },
  ],
  s: [
    tw`mobile:(text-xs px-1.5 py-0.5 h-[2.4rem]) desktop:(text-s px-2 py-1 h-[2.8rem])`,
    { svg: tw`mobile:(w-[1.2rem] h-[1.2rem]) desktop:(w-[1.5rem] h-[1.5rem])` },
  ],
  default: [
    tw`mobile:(text-s px-2 py-1 h-[2.8rem]) desktop:(text-m px-2.5 py-1.5 h-[3.2rem])`,
    { svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) desktop:(w-[1.8rem] h-[1.8rem])` },
  ],
};

const iconStyleMap: Record<string, TwStyle[]> = {
  l: [
    tw`mobile:(w-[3.2rem] h-[3.2rem]) desktop:(w-[3.6rem] h-[3.6rem])`,
    { svg: tw`mobile:(w-[1.8rem] h-[1.8rem]) desktop:(w-[2.2rem] h-[2.2rem])` },
  ],
  m: [
    tw`mobile:(w-[2.8rem] h-[2.8rem]) desktop:(w-[3.2rem] h-[3.2rem])`,
    { svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) desktop:(w-[1.8rem] h-[1.8rem])` },
  ],
  s: [
    tw`mobile:(w-[2.4rem] h-[2.4rem]) desktop:(w-[2.8rem] h-[2.8rem])`,
    { svg: tw`mobile:(w-[1.2rem] h-[1.2rem]) desktop:(w-[1.5rem] h-[1.5rem])` },
  ],
  default: [
    tw`mobile:(w-[2.8rem] h-[2.8rem]) desktop:(w-[3.2rem] h-[3.2rem])`,
    { svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) desktop:(w-[1.8rem] h-[1.8rem])` },
  ],
};

export { fontStyleMap, sizeStyleMap, iconStyleMap, iconButtonBaseStyle, basicButtonBaseStyle };
