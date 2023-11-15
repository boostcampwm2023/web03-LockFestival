import type { Config } from 'tailwindcss';

function generateSpacingValues() {
  const spacingValues: Record<number, string> = {};
  const RATIO = 0.4;
  let key = 0.5;

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
      mobile: { max: '430px' },
      // tablet: { min: '431px', max: '1023px' },
      desktop: '431px',
    },
    fontFamily: {
      dnfbit: ['DNFBitBitv2'],
      jua: ['BMJUA'],
      gsans: ['GmarketSansMedium'],
    },
    fontSize: {
      xs: [
        '1rem',
        {
          lineHeight: '1rem',
        },
      ],
      s: [
        '1.2rem',
        {
          lineHeight: '1.2rem',
        },
      ],
      m: [
        '1.4rem',
        {
          lineHeight: '1.4rem',
        },
      ],
      l: [
        '1.6rem',
        {
          lineHeight: '1.6rem',
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
      },
    },
  },
  plugins: [],
} satisfies Config;
