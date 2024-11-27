import { cva } from '../../styled-system/css';

export const inputStyles = cva({
  base: {
    borderColor: 'gray.300',
    _focusVisible: {
      outlineColor: 'main.base',
    },
  },
  variants: {
    hasError: {
      true: {
        color: 'red',
        borderColor: 'red',
        _focusVisible: {
          outlineColor: 'red',
        },
      },
    },
  },
  defaultVariants: {
    hasError: false,
  },
});
