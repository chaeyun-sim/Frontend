// /components: 재사용 가능한 UI 컴포넌트를 저장

import { ReactNode } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps {
  variant?: 'contained' | 'outlined';
  size?: 'large' | 'small' | 'fullWidth';
  type?: 'submit' | 'reset' | 'button';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  postfix?: ReactNode;
  prefix?: ReactNode;
  className?: string;
}

const Button = ({
  variant = 'contained',
  size = 'large',
  type = 'button',
  disabled = false,
  postfix,
  prefix,
  onClick,
  className,
  text,
}: IProps) => {
  const colorMode = () => {
    if (disabled) {
      return css({
        backgroundColor: 'gray.300',
        color: 'white',
        borderColor: 'gray.300',
        cursor: 'default',
      });
    } else if (variant === 'contained') {
      return css({
        backgroundColor: 'main.base',
        color: 'white',
        borderColor: 'main.base',
        '&:hover': {
          backgroundColor: 'main.dark',
        },
      });
    } else if (variant === 'outlined') {
      return css({
        backgroundColor: 'white',
        color: 'main.base',
        borderColor: 'main.base',
        '&:hover': {
          backgroundColor: 'gray.50',
        },
      });
    }
  };

  const sizeMode = () => {
    if (size === 'large') {
      return css({
        padding: '12px 0',
        width: '140px',
        textStyle: 'button1',
      });
    } else if (size === 'small') {
      return css({
        padding: '8px 12px',
        textStyle: 'button2',
      });
    } else if (size === 'fullWidth') {
      return css({
        width: 'calc(100% - 32px)',
        margin: '0 16px',
        height: '43px',
      });
    }
  };

  return (
    <button
      type={type}
      className={cx(
        colorMode(),
        sizeMode(),
        styles.button_container,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {prefix}
      {text}
      {postfix}
    </button>
  );
};

export default Button;

const styles = {
  button_container: css({
    borderRadius: '4px',
    borderWidth: '1px',
  }),
};
