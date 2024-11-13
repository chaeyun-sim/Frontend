import { css } from '../../styled-system/css';

export const getInputStyle = (hasError?: boolean, disabled?: boolean) => {
  const baseStyle = {
    borderColor: 'gray.300',
    _focusVisible: {
      outlineColor: 'main.base',
    },
  };

  if (hasError) {
    return css({
      color: 'red',
      borderColor: 'red',
      _focusVisible: {
        outlineColor: 'red',
      },
    });
  }

  if (disabled) {
    return css(baseStyle);
  }

  return css(baseStyle);
};
