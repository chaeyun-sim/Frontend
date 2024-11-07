import FollowingProfile from './FollowingProfile';
import { css, cx } from '../../../styled-system/css';

interface IProps {
  followings: IPostingFollowing[];
}

const PostingFollowings = ({ followings }: IProps) => {
  return (
    <div className={styles.container}>
      {/* <div className={cx(styles.box, styles.left_box)} /> */}
      <ul className={styles.list}>
        {followings.map((v) => (
          <li key={v?.broadcasterId || 0}>
            <FollowingProfile
              profile={v?.profileUrl || ''}
              todayWords={v?.todaySaying}
            />
          </li>
        ))}
      </ul>
      {/* <div className={cx(styles.box, styles.right_box)} /> */}
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
  box: css({
    position: 'absolute',
    top: 0,
    width: '48px',
    height: '100%',
    zIndex: 10,
  }),
  left_box: css({
    left: 0,
    background: 'linear-gradient(to left, transparent, white)',
  }),
  right_box: css({
    right: 0,
    background: 'linear-gradient(to right, transparent, white)',
  }),
};
