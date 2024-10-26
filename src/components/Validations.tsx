import Icon from './common/Icon';
import { css, cx } from '../../styled-system/css';

interface IProps {
  validationList: { id: number; value: string }[];
  validated: { [key: number]: boolean };
}

const Validations = ({ validationList, validated }: IProps) => {
  return (
    <ul className={styles.list}>
      {validationList.map(({ id, value }) => (
        <li
          key={id}
          className={cx(
            styles.item,
            validated[id] ? styles.validated_item : styles.default_item
          )}
        >
          <Icon name={`check-sm${validated[id] ? '-checked' : ''}`} /> {value}
        </li>
      ))}
    </ul>
  );
};

export default Validations;

const styles = {
  list: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }),
  item: css({
    display: 'flex',
    gap: '8px',
    textStyle: 'caption2',
  }),
  default_item: css({
    color: 'gray.300',
  }),
  validated_item: css({
    color: 'main.base',
  }),
};
