import ProfileItem from './ProfileItem';
import { css } from '../../../styled-system/css';
import IconButton from '../common/IconButton';

interface IProps {
  list?: IProfile[] | null;
  onClose: () => void;
}

const ProfileList = ({ list, onClose }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IconButton icon="close" onClick={onClose} />
      </div>
      <ul className={styles.list}>
        {list?.map((v) => (
          <li>
            <ProfileItem profile={v.profileUrl} nickname={v.nickname} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;

const styles = {
  container: css({
    width: 268,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    boxShadow: 'shadow1',
    borderRadius: 8,
  }),
  header: css({
    padding: 12,
    display: 'flex',
    justifyContent: 'end',
  }),
  list: css({
    display: 'flex',
    flexDirection: 'column',
    '& > li:not(:last-of-type)': {
      borderBottom: '1px solid',
      borderColor: 'gray.100',
    },
  }),
};
