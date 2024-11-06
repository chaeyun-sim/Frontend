import Image from 'next/image';

import { css } from '../../../styled-system/css';

const PostingButton = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...props} className={styles.button}>
      <Image src={'/icons/pen-white.svg'} alt="pen" width={20} height={20} />
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
