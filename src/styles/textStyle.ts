import { defineTextStyles } from '@pandacss/dev';

export const textStyles = defineTextStyles({
  title1: {
    description: 'title large',
    value: {
      fontSize: '24px',
      fontWeight: 'semibold',
    },
  },
  title2: {
    description: 'title medium',
    value: {
      fontSize: '20px',
      fontWeight: 'semibold',
    },
  },
  body1: {
    description: 'body large - semibold',
    value: {
      fontSize: '18px',
      fontWeight: 'semibold',
    },
  },
  body2: {
    description: 'body large - regular',
    value: {
      fontSize: '18px',
      fontWeight: 'regular',
    },
  },
  body3: {
    description: 'body small - semibold',
    value: {
      fontSize: '16px',
      fontWeight: 'semibold',
    },
  },
  body4: {
    description: 'body small - regular',
    value: {
      fontSize: '16px',
      fontWeight: 'regular',
    },
  },
  button1: {
    description: 'button text - medium',
    value: {
      fontSize: '15px',
      fontWeight: 'medium',
    },
  },
  button2: {
    description: 'button text - regular',
    value: {
      fontSize: '15px',
      fontWeight: 'regular',
    },
  },
  caption1: {
    description: 'caption1 - semibold',
    value: {
      fontSize: '13px',
      fontWeight: 'semibold',
    },
  },
  caption2: {
    description: 'caption2 - regular',
    value: {
      fontSize: '13px',
      fontWeight: 'regular',
    },
  },
  caption3: {
    description: 'caption3 - regular',
    value: {
      fontSize: '12px',
      fontWeight: 'regular',
    },
  },
});
