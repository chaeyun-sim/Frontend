import { css } from '../../../styled-system/css';
import Icon from '../common/Icon';

const PostingButton = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={styles.button}>
      <Icon name="pen-white" />
    </button>
  );
};

export default PostingButton;

const styles = {
  button: css({
    width: '48px',
    height: '48px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'main.base',
    borderRadius: '50%',
  }),
};
