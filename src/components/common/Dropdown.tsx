import React, { useState } from 'react';
import { css, cx } from '../../../styled-system/css';

const Dropdown = () => {
  const [isFocused, setIsFocused] = useState('');

  return (
    <div className={styles.dropdown_container}>
      {['tag1', 'tag2', 'tag3', 'tag4', 'tag5'].map((item) => (
        <button
          className={cx(
            styles.dropdown_item,
            css({
              backgroundColor: isFocused === item ? 'main.light2' : 'white',
            })
          )}
          onClick={() => setIsFocused(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;

const styles = {
  dropdown_container: css({
    width: '200px',
  }),
  dropdown_item: css({
    width: '100%',
    height: '31px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 12px',
    textStyle: 'button2',
    color: 'gray.900',
    outline: 'none',
  }),
};
