import Button from '@/components/common/Button';
import useToggle from '@/hooks/useToggle';

import { css, cx } from '../../../../styled-system/css';
import PostingButton from '../PostingButton';

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
      <div className={snsMainStyles.post_button_container}>
        <PostingButton />
      </div>
    </div>
  );
};

export default SnsMain;

export const snsMainStyles = {
  container: css({
    position: 'relative',
    padding: '16px',
    minHeight: '568px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    borderX: '1px solid',
    borderColor: 'main.base',
  }),
  close_container: css({
    height: '568px',
    overflowY: 'hidden',
  }),
  content_container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  }),
  title: css({
    textStyle: 'title1',
  }),
  content: css({
    textStyle: 'body4',
    color: 'gray.500',
    whiteSpace: 'pre-wrap',
  }),
  more_button_container: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  }),
  close_more_button_container: css({
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: '200px',
    paddingBottom: 16,
    alignItems: 'end',
    background: 'linear-gradient(to bottom, transparent, white)',
  }),
  post_button_container: css({
    position: 'absolute',
    right: '18px',
    bottom: '36px',
  }),
};
