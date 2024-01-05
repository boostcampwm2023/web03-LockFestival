import type { Config } from 'tailwindcss';

function generateSpacingValues() {
  const spacingValues: Record<number, string> = {};
  const RATIO = 0.4;
  let key = 0;

  while (key <= 10) {
    let value = Number((key * RATIO).toPrecision(2));
    spacingValues[key] = `${value}rem`;
    key += 0.5;
  }

  return spacingValues;
}

const spacingObject = generateSpacingValues();

export default {
  content: ['index.html', './src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    screens: {
      mobile: { max: '640px' },
      tablet: { min: '641px', max: '1023px' },
      desktop: { min: '1024px' },
    },
    fontFamily: {
      pretendard: ['Pretendard-Regular'],
      maplestory: ['MaplestoryOTFLight'],
    },
    fontSize: {
      'xs': [
        '1rem',
        {
          lineHeight: '1rem',
        },
      ],
      'xs-bold': [
        '1rem',
        {
          lineHeight: '1rem',
          fontWeight: 900,
        },
      ],
      's': [
        '1.2rem',
        {
          lineHeight: '1.2rem',
        },
      ],
      's-bold': [
        '1.2rem',
        {
          lineHeight: '1.2rem',
          fontWeight: 900,
        },
      ],
      'm': [
        '1.4rem',
        {
          lineHeight: '1.4rem',
        },
      ],
      'm-bold': [
        '1.4rem',
        {
          lineHeight: '1.4rem',
          fontWeight: 900,
        },
      ],
      'l': [
        '1.6rem',
        {
          lineHeight: '1.6rem',
        },
      ],
      'l-bold': [
        '1.6rem',
        {
          lineHeight: '1.6rem',
          fontWeight: 900,
        },
      ],
      'xl': [
        '1.8rem',
        {
          lineHeight: '1.8rem',
        },
      ],
      'xl-bold': [
        '1.8rem',
        {
          lineHeight: '1.8rem',
          fontWeight: 900,
        },
      ],
    },
    spacing: spacingObject,
    extend: {
      borderRadius: {
        default: '3rem',
      },
      colors: {
        'gray-dark': '#1A1A1A',
        'gray': '#222222',
        'gray-light': '#282828',
        'white-60': '#D2DAD0',
        'green-light': '#1AB93D',
        'green-dark': '#1F371D',
        'red-dark': '#BE3144',
        'white': '#F2F2F2',
        'orange': '#e3651d',
        'border-default': '#5F6E76',
      },
    },
  },
  plugins: [],
} satisfies Config;
