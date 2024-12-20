import Comment from './Comment';
import { css } from '../../../styled-system/css';

interface IProps {
  list?: ICommentInfo[] | null;
}

const Comments = ({ list }: IProps) => {
  return (
    <ul className={styles.list}>
      {list?.map((v) => (
        <li key={v.commentId}>
          <Comment
            profileUrl={v.commentMemberProfile}
            nickname={v.commentMemberNickname}
            comment={v.commentContent}
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
