import Icon from './Icon';
import { css } from '../../../styled-system/css';

interface IProps {
  checked: boolean;
  handleCheck: () => void;
  label?: string;
}

const CheckBox = ({ checked, handleCheck, label }: IProps) => {
  return (
    <button onClick={handleCheck} className={styles.container}>
      <Icon name={`check2-${checked ? '' : 'un'}checked`} />
      {label ? <span>{label}</span> : null}
    </button>
  );
};

export default CheckBox;

const styles = {
  container: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
};
