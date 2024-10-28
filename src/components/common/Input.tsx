import React, { ChangeEvent, ReactNode } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onSetValue: (value: string) => void;
  hasError?: boolean;
  postfix?: ReactNode;
  onClickRightIcon?: () => void;
}

const Input = ({
  value,
  onSetValue,
  hasError,
  disabled,
  postfix,
  onClickRightIcon,
  ...props
}: IProps) => {
  const bottomColor = () => {
    if (hasError) {
      return css({
        color: 'red',
        borderBottomColor: 'red',
      });
    } else if (disabled) {
      return css({
        borderBottomColor: 'gray.300',
      });
    }

    return css({
      borderBottomColor: 'gray.300',
      _focus: {
        borderBottomColor: 'main.base',
      },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSetValue(e.target.value);
  };

  return (
    <div className={styles.input_container}>
      <input
        value={value}
        onChange={handleChange}
        className={cx(styles.input, bottomColor())}
        disabled={disabled}
        readOnly={disabled}
        style={{ paddingRight: postfix ? 30 : 0 }}
        {...props}
      />
      <button className={styles.postfix} onClick={onClickRightIcon}>
        {postfix}
      </button>
    </div>
  );
};

export default Input;

const styles = {
  input_container: css({
    position: 'relative',
  }),
  input: css({
    padding: '0 12px',
    height: '37px',
    width: '100%',
    borderBottomWidth: '1px',
    textStyle: 'body4',
    color: 'gray.900',
    outline: 'none',
  }),
  postfix: css({
    position: 'absolute',
    right: 0,
    top: 6,
  }),
};
