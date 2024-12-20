import ProfileItem from './ProfileItem';
import { css } from '../../../styled-system/css';
import Icon from '../common/Icon';
import { ModalProps } from '../modal/modal.interface';

interface IProps extends ModalProps {
  list?: IProfile[] | null;
}

const ProfileList = ({ list, onClose }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      <ul className={styles.list}>
        {list?.map((v) => (
          <li key={v.broadcasterId}>
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
