import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {    
      colors: {
        'text': '#eaf4ee',
        'background': '#20282c',
        'primary': '#96e5ba',
        'secondary': '#2df389',
        'accent': '#2ddff3',
       },              
      },
  },
  plugins: [],
};

export default config;
