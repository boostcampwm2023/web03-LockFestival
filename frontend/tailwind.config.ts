import type { Config } from 'tailwindcss';

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
      gsans: ['GmarketSansTTFMedium'],
    },
    fontSize: {
      xs: [
        '1rem',
        {
          lineHeight: '1.6rem',
        },
      ],
      s: [
        '1.2rem',
        {
          lineHeight: '1.8rem',
        },
      ],
      m: [
        '1.4rem',
        {
          lineHeight: '2rem',
        },
      ],
      l: [
        '1.6rem',
        {
          lineHeight: '2.2rem',
        },
      ],
    },

    extend: {
      borderRadius: {
        default: '3rem',
      },
      colors: {
        'gray-dark': '#1A1A1A',
        'gray': '#222222',
        'gray-light': '#282828',
        'while-60': '#D2DAD0',
      },
    },
  },
  plugins: [],
} satisfies Config;
