import { useState } from 'react';

import { SNS_FILTER_OPTIONS } from '@/constants/sns';

import SnsItem from './SnsItem';
import { css } from '../../../styled-system/css';
import Select from '../common/Select';

interface IProps {
  list?: ISnsItem[] | null;
  snsId: number;
  setSnsId: (value: number) => void;
}

const SnsList = ({ list, snsId, setSnsId }: IProps) => {
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
        {list?.map((v) => (
          <li
            key={v.postId}
            onClick={() => setSnsId(v.postId)}
            className={styles.item}
          >
            <SnsItem
              title={v.title}
              active={v.postId === snsId}
              type={
                v.hasImage && v.hasVideo
                  ? 'imagevideo'
                  : v.hasImage
                    ? 'image'
                    : v.hasVideo
                      ? 'video'
                      : 'text'
              }
            />
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
  item: css({
    cursor: 'pointer',
  }),
  footer: css({ padding: '8px 16px' }),
};
