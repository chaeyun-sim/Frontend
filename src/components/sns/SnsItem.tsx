import Image from 'next/image';

import { css, cx } from '../../../styled-system/css';

interface IProps {
  title: string;
  type?: TSnsType;
  active?: boolean;
}

const SnsItem = ({ title, type = 'text', active }: IProps) => {
  return (
    <div
      className={cx(styles.container, active ? styles.active : styles.default)}
    >
      <p>{title}</p>
      {type !== 'text' && (
        <Image src={`/icons/${type}.svg`} alt={type} width={20} height={20} />
      )}
    </div>
  );
};

export default SnsItem;

const styles = {
  container: css({
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid',
  }),
  default: css({
    borderColor: 'transparent',
    _hover: {
      backgroundColor: 'main.light2',
    },
  }),
  active: css({
    borderColor: 'main.base',
    backgroundColor: 'main.light1 !important',
  }),
};
