import { PropsWithChildren } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps {
  isSelected: boolean;
  onClickTag: () => void;
}

const Tag = ({
  isSelected,
  onClickTag,
  children,
}: PropsWithChildren<IProps>) => {
  return (
    <div
      className={
        isSelected
          ? cx(styles.container, styles.container_active)
          : cx(styles.container, styles.container_inactive)
      }
      onClick={onClickTag}
    >
      {children}
    </div>
  );
};

export default Tag;

const styles = {
  container: css({
    width: 'fit-content',
    padding: '4px 8px',
    borderRadius: '20px',
    textStyle: 'caption3',
    cursor: 'pointer',
  }),
  container_inactive: css({
    backgroundColor: 'main.light2',
    color: 'main.base',
  }),
  container_active: css({
    color: 'white',
    backgroundColor: 'main.base',
  }),
};
