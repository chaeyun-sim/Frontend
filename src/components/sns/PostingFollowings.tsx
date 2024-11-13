import FollowingProfile from './FollowingProfile';
import { css, cx } from '../../../styled-system/css';

interface IProps {
  followings?: IPostingFollowing[] | null;
}

const PostingFollowings = ({ followings }: IProps) => {
  return (
    <div className={styles.container}>
      {/* <div className={cx(styles.overlay, styles.left_overlay)} /> */}
      <ul className={styles.list}>
        {followings?.map((v) => (
          <li key={v?.broadcasterId || 0}>
            <FollowingProfile
              profile={v?.profileUrl || ''}
              todayWords={v?.todaySaying}
            />
          </li>
        ))}
      </ul>
      {/* <div className={cx(styles.overlay, styles.right_overlay)} /> */}
    </div>
  );
};

export default PostingFollowings;

const styles = {
  container: css({
    position: 'relative',
    width: '620px',
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
