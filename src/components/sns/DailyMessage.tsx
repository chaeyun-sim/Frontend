import { useState } from 'react';

import { css, cx } from '../../../styled-system/css';
import Icon from '../common/Icon';

interface IProps {
  message: string;
}

const DailyMessage = ({ message }: IProps) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className={cx(styles.container, isHover ? styles.hover : styles.default)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Icon name="megaphone" />
      {isHover && <p className={styles.text}>{message}</p>}
    </div>
  );
};

export default DailyMessage;

const styles = {
  container: css({
    padding: '4px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    transitionProperty: 'width, border-radius',
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease',
  }),
  default: css({
    width: '24px',
    borderRadius: '50%',
  }),
  hover: css({
    width: '188px',
    gap: '4px',
    borderRadius: '4px',
  }),
  text: css({
    textStyle: 'caption3',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  }),
};
