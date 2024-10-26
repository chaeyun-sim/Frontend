import Icon from './common/Icon';
import { css, cx } from '../../styled-system/css';

interface IProps {
  validationList: { id: number; value: string }[];
  validated: { [key: number]: boolean };
  isInitial: boolean;
}

const Validations = ({ validationList, validated, isInitial }: IProps) => {
  return (
    <ul className={styles.list}>
      {validationList.map(({ id, value }) => (
        <li
          key={id}
          className={cx(
            styles.item,
            isInitial
              ? styles.default_item
              : validated[id]
                ? styles.validated_item
                : styles.error_item
          )}
        >
          <Icon
            name={`check-sm${isInitial ? '' : validated[id] ? '-checked' : '-red'}`}
          />
          {value}
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
  error_item: css({
    color: 'red',
  }),
  validated_item: css({
    color: 'main.base',
  }),
};
