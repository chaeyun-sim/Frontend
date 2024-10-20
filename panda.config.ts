import { textStyles } from '@/styles/textStyle';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      textStyles: textStyles,
    },
    tokens: {
      colors: {
        main: {
          base: { value: '#7C0DE4' },
          dark: { value: '#5B0CA6' },
          light1: { value: '#DFD0FF' },
          light2: { value: '#F6F1FF' },
        },
        gray: {
          50: { value: '#F6F6F6' },
          100: { value: '#E7E7E7' },
          200: { value: '#D1D1D1' },
          300: { value: '#B0B0B0' },
          400: { value: '#888888' },
          500: { value: '#6D6D6D' },
          600: { value: '#5D5D5D' },
          700: { value: '#4F4F4F' },
          800: { value: '#3E3E3E' },
          900: { value: '#2A2A2A' },
        },
        white: { value: '#FFFFFF' },
        black: { value: '#0F0F0F' },
        red: { value: '#FC1456' },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
});
