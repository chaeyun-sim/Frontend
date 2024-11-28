import Comment from './Comment';
import { css } from '../../../styled-system/css';

interface IProps {
  list?: IComment[] | null;
}

const Comments = ({ list }: IProps) => {
  return (
    <ul className={styles.list}>
      {list?.map((v) => (
        <li key={v.id}>
          <Comment
            profileUrl={v.profileUrl}
            nickname={v.nickname}
            comment={v.comment}
          />
        </li>
      ))}
    </ul>
  );
};

export default Comments;

const styles = {
  list: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxHeight: 511,
    overflowY: 'auto',
  }),
};
