import Profile from './Profile';
import { css } from '../../../styled-system/css';

interface IProps {
  viewers?: IProfile[] | null;
}

const Viewers = ({ viewers }: IProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>내 게시글을 본 방송인</p>
      <ul className={styles.list}>
        {viewers?.map((v) => (
          <li>
            <Profile profile={v.profileUrl} />
          </li>
        ))}
        {viewers && viewers?.length > 2 && (
          <li>
            <div className={styles.empty}>+{viewers.length - 2}</div>
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
  }),
};
