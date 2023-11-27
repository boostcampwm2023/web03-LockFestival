import tw, { TwStyle } from 'twin.macro';

const fontStyleMap: Record<string, TwStyle> = {
  pretendard: tw`font-pretendard`,
  maplestory: tw`font-maplestory`,
  default: tw`font-pretendard`,
};

const sizeStyleMap: Record<string, TwStyle[]> = {
  'l': [
    tw`mobile:(text-m px-2.5 h-[3.2rem]) tablet:(text-l px-3 h-[3.6rem]) desktop:(text-l px-3 h-[3.6rem])`,
    {
      svg: tw`mobile:(w-[1.8rem] h-[1.8rem]) tablet:(w-[2rem] h-[2rem]) desktop:(w-[2rem] h-[2rem])`,
    },
  ],
  'l-bold': [
    tw`mobile:(text-m-bold px-2.5 h-[3.2rem]) tablet:(text-l-bold px-3 h-[3.6rem]) desktop:(text-l-bold px-3 h-[3.6rem])`,
    {
      svg: tw`mobile:(w-[1.8rem] h-[1.8rem]) tablet:(w-[2rem] h-[2rem]) desktop:(w-[2rem] h-[2rem])`,
    },
  ],
  'm': [
    tw`mobile:(text-s px-2 h-[2.8rem]) tablet:(text-m px-2.5) h-[3.2rem] desktop:(text-m px-2.5) h-[3.2rem]`,
    {
      svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) tablet:(w-[1.8rem] h-[1.8rem]) desktop:(w-[1.8rem] h-[1.8rem])`,
    },
  ],
  'm-bold': [
    tw`mobile:(text-s-bold px-2 h-[2.8rem]) tablet:(text-m-bold px-2.5) h-[3.2rem] desktop:(text-m-bold px-2.5) h-[3.2rem]`,
    {
      svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) tablet:(w-[1.8rem] h-[1.8rem]) desktop:(w-[1.8rem] h-[1.8rem])`,
    },
  ],
  's': [
    tw`mobile:(text-xs px-1.5 h-[2.4rem]) tablet:(text-s px-2 h-[2.8rem]) desktop:(text-s px-2 h-[2.8rem])`,
    {
      svg: tw`mobile:(w-[1.2rem] h-[1.2rem]) tablet:(w-[1.5rem] h-[1.5rem]) desktop:(w-[1.5rem] h-[1.5rem])`,
    },
  ],
  's-bold': [
    tw`mobile:(text-xs-bold px-1.5 h-[2.4rem]) tablet:(text-s-bold px-2 h-[2.8rem]) desktop:(text-s-bold px-2 h-[2.8rem])`,
    {
      svg: tw`mobile:(w-[1.2rem] h-[1.2rem]) tablet:(w-[1.5rem] h-[1.5rem]) desktop:(w-[1.5rem] h-[1.5rem])`,
    },
  ],
  'default': [
    tw`mobile:(text-s px-2 h-[2.8rem]) tablet:(text-m px-2.5 h-[3.2rem]) desktop:(text-m px-2.5 h-[3.2rem])`,
    {
      svg: tw`mobile:(w-[1.5rem] h-[1.5rem]) tablet:(w-[1.8rem] h-[1.8rem]) desktop:(w-[1.8rem] h-[1.8rem])`,
    },
  ],
};

export { fontStyleMap, sizeStyleMap };
