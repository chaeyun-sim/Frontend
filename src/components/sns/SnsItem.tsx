import { css, cx } from '../../../styled-system/css';
import Icon from '../common/Icon';

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
      {type !== 'text' && <Icon name={type} />}
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
