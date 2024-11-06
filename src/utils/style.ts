import { css } from '../../styled-system/css';

export const inputBorderColor = (hasError?: boolean, disabled?: boolean) => {
  if (hasError) {
    return css({
      color: 'red',
      borderColor: 'red',
      _focusVisible: {
        outlineColor: 'red',
      },
    });
  } else if (disabled) {
    return css({
      borderColor: 'gray.300',
    });
  }

  return css({
    borderColor: 'gray.300',
    _focusVisible: {
      outlineColor: 'main.base',
    },
  });
};
