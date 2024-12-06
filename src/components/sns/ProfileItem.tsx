import Image from 'next/image';

import { css } from '../../../styled-system/css';

interface IProps {
  profile: string;
  nickname: string;
}

const ProfileItem = ({ profile, nickname }: IProps) => {
  return (
    <div className={styles.container}>
      <Image
        src={profile}
        alt="profile"
        width={36}
        height={36}
        objectFit="cover"
        className={styles.profile}
      />
      <span className={styles.name}>{nickname}</span>
    </div>
  );
};

export default ProfileItem;

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  }),
  profile: css({ backgroundColor: 'white', borderRadius: '50%' }),
  name: css({
    textStyle: 'body4',
  }),
};
