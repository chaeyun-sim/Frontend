import useToggle from '@/hooks/useToggle';

import Profile from './Profile';
import ProfileList from './ProfileList';
import { css } from '../../../styled-system/css';

interface IProps {
  list?: IProfile[] | null;
}

const Viewers = ({ list }: IProps) => {
  const { isOpen: isMore, handleToggle: handleToggleMore } = useToggle(false);

  return (
    <div className={styles.container}>
      <p className={styles.title}>내 게시글을 본 방송인</p>
      <ul className={styles.list}>
        {list?.slice(0, 2).map((v) => (
          <li key={v.broadcasterId}>
            <Profile profile={v.profileUrl} />
          </li>
        ))}
        {list && list?.length > 2 && (
          <li className={css({ position: 'relative' })}>
            <div onClick={handleToggleMore} className={styles.empty}>
              +{list.length - 2}
            </div>
            {isMore && (
              <div className={styles.profile_list_container}>
                <ProfileList list={[]} onClose={handleToggleMore} />
              </div>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Viewers;

const styles = {
  container: css({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    borderRadius: '4px',
    boxShadow: 'shadow1',
  }),
  title: css({
    textStyle: 'body3',
  }),
  list: css({
    display: 'flex',
    gap: 8,
  }),
  empty: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'gray.50',
    color: 'gray.500',
    borderRadius: '50%',
    cursor: 'pointer',
  }),
  profile_list_container: css({
    position: 'absolute',
    top: 'calc(50% + 20px)',
    left: '50%',
  }),
};
