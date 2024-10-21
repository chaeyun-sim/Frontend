import React, { useState } from 'react';
import { css, cx } from '../../../styled-system/css';

interface IProps {
  tabList: string[];
}

const Tabs = ({ tabList }: IProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.tabs_wrapper}>
      <div className={styles.tabs_container}>
        {tabList.map((tab, idx) => (
          <button
            key={tab}
            className={cx(styles.tab, selected === idx && styles.selected_tab)}
            onClick={() => setSelected(idx)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className={styles.divider} />
    </div>
  );
};

export default Tabs;

const styles = {
  tabs_wrapper: css({
    position: 'relative',
    textStyle: 'button1',
  }),
  tabs_container: css({
    height: '44px',
    width: '100%',
    display: 'flex',
    position: 'relative',
    zIndex: 1,
  }),
  tab: css({
    width: '160px',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    position: 'relative',
    color: 'gray.300',
    fontWeight: 500,
  }),
  selected_tab: css({
    borderColor: 'main.base',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderBottomColor: 'white',
    marginBottom: '-1px',
    zIndex: 2,
    color: 'main.base !important',
    fontWeight: 500,
  }),
  divider: css({
    height: '1px',
    width: '100%',
    backgroundColor: 'main.base',
    position: 'absolute',
    bottom: 0,
    left: 0,
  }),
};
