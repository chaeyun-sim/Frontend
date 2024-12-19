import Profile from './Profile';
import { css, cx } from '../../../styled-system/css';

interface IProps {
  list?: ILastestSnsItem[] | null;
}

const LatestSnsList = ({ list }: IProps) => {
  return (
    <div className={styles.container}>
      {/* <div className={cx(styles.overlay, styles.left_overlay)} /> */}
      <ul className={styles.list}>
        {list?.map((v) => (
          <li key={v?.memberId || 0}>
            <Profile
              profile={v?.profileUrl || ''}
              dailyMessage={v?.dailyMessage}
            />
          </li>
        ))}
      </ul>
      {/* <div className={cx(styles.overlay, styles.right_overlay)} /> */}
    </div>
  );
};

export default LatestSnsList;

const styles = {
  container: css({
    position: 'relative',
  }),
  list: css({
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),
  overlay: css({
    position: 'absolute',
    top: 0,
    width: '48px',
    height: '100%',
    zIndex: 10,
  }),
  left_overlay: css({
    left: 0,
    background: 'linear-gradient(to left, transparent, white)',
  }),
  right_overlay: css({
    right: 0,
    background: 'linear-gradient(to right, transparent, white)',
  }),
};
