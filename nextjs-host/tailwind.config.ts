import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#0d1117',
          light: '#161b22',
          border: '#30363d',
          text: '#c9d1d9',
          link: '#58a6ff',
          green: '#238636',
          hover: '#21262d',
        },
      },
    },
  },
  plugins: [],
};

export default config;
