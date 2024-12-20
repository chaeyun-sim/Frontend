import Image from 'next/image';

import Icon from './common/Icon';
import { css } from '../../styled-system/css';

interface IProps {
  onClick: () => void;
}

const Avatar = ({ onClick }: IProps) => {
  return (
    <button className={styles.profile_box_wrapper} onClick={onClick}>
      <div className={styles.profile_box}>
        <Image
          src={''}
          alt="selected profile"
          width={36}
          height={36}
          objectFit="cover"
        />
      </div>
      <div className={styles.delete_btn}>
        <Icon
          name="delete-btn-red"
          className={css({ width: 12, height: 12 })}
        />
      </div>
    </button>
  );
};

export default Avatar;

const styles = {
  profile_box_wrapper: css({
    width: '36px',
    height: '36px',
    position: 'relative',
  }),
  profile_box: css({
    width: 'inherit',
    height: 'inherit',
    borderRadius: '50%',
    borderColor: 'main.base',
    borderWidth: '1px',
    overflow: 'hidden',
  }),
  delete_btn: css({
    position: 'absolute',
    top: 0,
    right: 0,
  }),
};
