import { ChangeEvent } from 'react';

import { css, cx } from '../../../styled-system/css';

interface IProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  value: string;
  setValue: (value: string) => void;
  options: { value: string; text: string }[];
  active?: boolean;
}

const Select = ({ value, setValue, options, active, ...props }: IProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      {...props}
      className={cx(styles.select, active ? styles.active : styles.default)}
    >
      {options.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;

const styles = {
  select: css({
    padding: '6px 8px',
    border: '1px solid',
    borderRadius: '4px',
    textStyle: 'caption2',
    _focusVisible: {
      outlineColor: 'main.base',
    },
  }),
  default: css({ borderColor: 'gray.100' }),
  active: css({
    borderColor: 'main.base',
    color: 'main.base',
  }),
};
