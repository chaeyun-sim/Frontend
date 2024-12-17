import React from 'react';

import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

interface IProps {
  onClick?: () => void;
  amount: number;
  label: string;
  isClickable?: boolean;
}

const StatBox = ({ onClick, amount, label, isClickable = false }: IProps) => {
  return (
    <div
      className={cx(
        styles.follow_box,
        css({ cursor: isClickable ? 'pointer' : 'default' })
      )}
      onClick={onClick}
    >
      <span className={styles.amount}>{amount}</span>
      <span className={styles.amount_label}>{label}</span>
    </div>
  );
};

export default StatBox;

const styles = {
  follow_box: flex({
    flexDir: 'column',
    width: '34px',
    height: '41px',
  }),
  amount: css({
    color: 'main.base',
    textStyle: 'body1',
    textAlign: 'center',
    alignSelf: 'center',
  }),
  amount_label: css({
    color: 'gray.900',
    textStyle: 'caption1',
    fontWeight: '400',
    marginTop: '0px',
  }),
};
