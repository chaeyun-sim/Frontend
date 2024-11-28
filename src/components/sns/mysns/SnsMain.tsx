import Button from '@/components/common/Button';
import useToggle from '@/hooks/useToggle';

import { css, cx } from '../../../../styled-system/css';
import { snsMainStyles } from '../sns/SnsMain';

interface IProps {
  title: string;
  content: string;
}

const SnsMain = ({ title, content }: IProps) => {
  const { isOpen: isMore, handleToggle: handleToggleMore } = useToggle(false);

  return (
    <div
      className={cx(
        snsMainStyles.container,
        styles.container,
        !isMore && snsMainStyles.close_container
      )}
    >
      <div className={snsMainStyles.content_container}>
        <p className={snsMainStyles.title}>{title}</p>
        <p className={snsMainStyles.content}>{content} </p>
      </div>
      <div
        className={cx(
          snsMainStyles.more_button_container,
          !isMore && snsMainStyles.close_more_button_container
        )}
      >
        <Button
          text={isMore ? '닫기' : '더보기'}
          variant="outlined"
          onClick={handleToggleMore}
        />
      </div>
    </div>
  );
};

export default SnsMain;

const styles = {
  container: css({
    borderBottom: '1px solid',
    borderRadius: '0 0 8px 8px',
  }),
};
