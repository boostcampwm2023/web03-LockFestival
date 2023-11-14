import tw, { TwStyle } from 'twin.macro';

const fontStyleMap: Record<string, TwStyle> = {
  dnfbit: tw`font-dnfbit`,
  jua: tw`font-jua`,
  gsans: tw`font-gsans`,
  default: tw`font-gsans`,
};

const sizeStyleMap: Record<string, TwStyle> = {
  l: tw`mobile:(text-m px-2.5 py-1.5 h-[3.2rem]) desktop:(text-l px-3 py-2 h-[3.6rem])`,
  m: tw`mobile:(text-s px-2 py-1 h-[2.8rem]) desktop:(text-m px-2.5 py-1.5) h-[3.2rem]`,
  s: tw`mobile:(text-xs px-1.5 py-0.5 h-[2.4rem]) desktop:(text-s px-2 py-1 h-[2.8rem])`,
  default: tw`mobile:(text-s px-2 py-1 h-[2.8rem]) desktop:(text-m px-2.5 py-1.5 h-[3.2rem])`,
};

export { fontStyleMap, sizeStyleMap };
