import Image from 'next/image';

import DailyMessage from './DailyMessage';
import { css, cx } from '../../../styled-system/css';

interface IProps {
  profile: string;
  dailyMessage?: string;
  isViewed?: boolean;
}

const Profile = ({ profile, dailyMessage, isViewed }: IProps) => {
  return (
    <div
      className={cx(
        styles.container,
        isViewed ? styles.viewed : styles.default
      )}
    >
      {dailyMessage && (
        <div className={styles.today_words_container}>
          <DailyMessage message={dailyMessage} />
        </div>
      )}
      <Image
        src={profile}
        alt="profile"
        width={72}
        height={72}
        className={styles.image}
      />
    </div>
  );
};

export default Profile;

const styles = {
  container: css({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '80px',
    height: '80px',
    border: '2px solid',
    borderRadius: '50%',
  }),
  default: css({
    borderColor: 'main.base',
  }),
  viewed: css({
    opacity: 0.3,
    borderColor: 'gray.400',
  }),
  today_words_container: css({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  }),
  image: css({
    borderRadius: '50%',
  }),
};
