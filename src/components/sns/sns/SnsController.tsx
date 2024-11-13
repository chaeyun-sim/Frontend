import Link from 'next/link';

import IconButton from '@/components/common/IconButton';

import { css } from '../../../../styled-system/css';

interface IProps {
  prevSnsId: number;
  nextSnsId: number;
}

const SnsController = ({ prevSnsId, nextSnsId }: IProps) => {
  return (
    <div className={styles.controller}>
      {prevSnsId ? (
        <Link href={`${prevSnsId}`}>
          <IconButton icon="left" />
        </Link>
      ) : (
        <div />
      )}
      {nextSnsId ? (
        <Link href={`${nextSnsId}`}>
          <IconButton icon="right" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default SnsController;

const styles = {
  controller: css({
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '0 0 8px 8px',
    border: '1px solid',
    borderColor: 'main.base',
    borderTopColor: 'gray.100',
  }),
};
