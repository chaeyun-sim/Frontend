import React from 'react';

import { css } from '../../../styled-system/css';
import { center } from '../../../styled-system/patterns';
import Icon from '../common/Icon';

interface IProps {
  onClick: () => void;
}

const AddPlatform = ({ onClick }: IProps) => {
  return (
    <button className={styles.box} onClick={onClick}>
      <Icon
        name="edit"
        className={css({ width: '12px', height: '12px', stroke: 'blue' })}
      />
    </button>
  );
};

export default AddPlatform;

const styles = {
  box: center({
    width: '24px',
    height: '24px',
    borderRadius: '100px',
    borderColor: 'gray.500',
    borderWidth: '1px',
  }),
};
