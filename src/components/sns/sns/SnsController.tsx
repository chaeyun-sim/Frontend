import { useRouter } from 'next/router';

import IconButton from '@/components/common/IconButton';

import { css } from '../../../../styled-system/css';

interface IProps {
  prevSnsId: number;
  nextSnsId: number;
}

const SnsController = ({ prevSnsId, nextSnsId }: IProps) => {
  const router = useRouter();

  const handleClickPrevSns = () => {
    router.push(`${prevSnsId}`);
  };
  const handleClickNextSns = () => {
    router.push(`${nextSnsId}`);
  };

  return (
    <div className={styles.controller}>
      {prevSnsId ? (
        <IconButton icon="left" onClick={handleClickPrevSns} />
      ) : (
        <div />
      )}
      {nextSnsId ? (
        <IconButton icon="right" onClick={handleClickNextSns} />
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
