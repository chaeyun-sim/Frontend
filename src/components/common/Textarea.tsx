import { ChangeEvent } from 'react';

import { inputStyles } from '@/utils/style';

import { css, cx } from '../../../styled-system/css';

interface IProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  setValue: (value: string) => void;
  rows?: number;
  hasError?: boolean;
}

const Textarea = ({
  value,
  setValue,
  rows = 2,
  hasError,
  disabled,
  ...props
}: IProps) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      rows={rows}
      disabled={disabled}
      {...props}
      className={cx(styles.container, inputStyles({ hasError }))}
    />
  );
};

export default Textarea;

const styles = {
  container: css({
    padding: '8px',
    backgroundColor: 'white',
    border: '1px solid',
    borderRadius: '4px',
    textStyle: 'button2',
    resize: 'none',
    _placeholder: {
      color: 'gray.700',
    },
  }),
};
