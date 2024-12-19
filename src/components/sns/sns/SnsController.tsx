import Icon from '@/components/common/Icon';

import { css } from '../../../../styled-system/css';

interface IProps {
  prevSnsId: number;
  nextSnsId: number;
  setSnsId: (value: number) => void;
}

const SnsController = ({ prevSnsId, nextSnsId, setSnsId }: IProps) => {
  return (
    <div className={styles.controller}>
      {prevSnsId ? (
        <button onClick={() => setSnsId(prevSnsId)}>
          <Icon name="left" />
        </button>
      ) : (
        <div />
      )}
      {nextSnsId ? (
        <button onClick={() => setSnsId(nextSnsId)}>
          <Icon name="right" />
        </button>
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
