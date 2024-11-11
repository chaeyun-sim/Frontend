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
          src={
            'https://images.unsplash.com/photo-1730343464315-a9ca01f9f1c6?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
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
