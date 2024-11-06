import Image from 'next/image';

import { css } from '../../../styled-system/css';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  size?: number;
}

const IconButton = ({ icon, size = 20, ...props }: IProps) => {
  return (
    <button {...props} className={styles.button}>
      <Image src={`/icons/${icon}.svg`} alt={icon} width={size} height={size} />
    </button>
  );
};

export default IconButton;

const styles = {
  button: css({
    display: 'inline-flex',
  }),
};
