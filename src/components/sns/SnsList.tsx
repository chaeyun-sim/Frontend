import { useState } from 'react';

import { SNS_FILTER_OPTIONS } from '@/constants/sns';

import SnsItem from './SnsItem';
import { css } from '../../../styled-system/css';
import Select from '../common/Select';

interface IProps {
  list: ISnsItem[];
}

const SnsList = ({ list }: IProps) => {
  const [selectedFilter, setSelectedFilter] = useState('1');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Select
          value={selectedFilter}
          setValue={setSelectedFilter}
          options={SNS_FILTER_OPTIONS}
          active={selectedFilter !== '1'}
        />
      </div>
      <ul className={styles.list}>
        {list.map((v) => (
          <li key={v.id}>
            <SnsItem title={v.title} type={v.type} active={v.id === 1} />
          </li>
        ))}
      </ul>
      <div className={styles.footer}></div>
    </div>
  );
};

export default SnsList;

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'shadow1',
    borderRadius: '8px',
  }),
  header: css({
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'end',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
  }),
  list: css({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '424px',
    overflowY: 'auto',
    '& > li:not(:last-of-type)': {
      borderBottom: '1px solid',
      borderColor: 'gray.100',
    },
  }),
  footer: css({ padding: '8px 16px' }),
};
