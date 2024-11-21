import Comment from './Comment';
import { css } from '../../../styled-system/css';

interface IProps {
  comments?: IComment[] | null;
}

const Comments = ({ comments }: IProps) => {
  return (
    <div>
      <ul className={styles.list}>
        {comments?.map((v) => (
          <li>
            <Comment
              profileUrl={v.profileUrl}
              nickname={v.nickname}
              comment={v.comment}
            />
          </li>
        ))}
      </ul>
    </div>
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
