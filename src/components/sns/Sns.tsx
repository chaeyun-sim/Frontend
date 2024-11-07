import Image from 'next/image';
import { useRouter } from 'next/router';

import useToggle from '@/hooks/useToggle';

import PostingButton from './PostingButton';
import { css, cx } from '../../../styled-system/css';
import Button from '../common/Button';
import IconButton from '../common/IconButton';
import CommentWriteModal from '../modal/CommentWriteModal';

interface IProps {
  data?: ISnsDetail;
  prevSnsId: number;
  nextSnsId: number;
  currentSnsId: number;
}

const Sns = ({ data, prevSnsId, nextSnsId, currentSnsId }: IProps) => {
  const router = useRouter();

  const { isOpen: isMore, handleToggle: handleToggleMore } = useToggle(false);
  const {
    isOpen: isOpenCommentModal,
    handleToggle: handleToggleOpenCommentModal,
  } = useToggle(false);

  const handleClickPrevSns = () => {
    router.push(`${prevSnsId}`);
  };

  const handleClickNextSns = () => {
    router.push(`${nextSnsId}`);
  };

  return (
    <div className={styles.container}>
      {isOpenCommentModal && (
        <CommentWriteModal
          onClose={handleToggleOpenCommentModal}
          currentSnsId={currentSnsId}
        />
      )}
      <div className={styles.header}>
        <div className={styles.header_button_container}>
          <Image
            src={data?.profileUrl || ''}
            alt="profile"
            width={36}
            height={36}
            className={styles.profile}
          />
          <div className={styles.name}>{data?.nickname}</div>
          {!data?.isFollowed && (
            <Button text="팔로우" variant="outlined" size="small" />
          )}
        </div>
        <div className={styles.header_button_container}>
          <Button
            text="댓글 달기"
            variant="outlined"
            size="small"
            onClick={handleToggleOpenCommentModal}
          />
          <IconButton icon="dot-white" />
        </div>
      </div>
      <div
        className={cx(
          styles.main_container,
          !isMore && styles.close_main_container
        )}
      >
        <div className={styles.main}>
          <p className={styles.title}>{data?.title}</p>
          <p className={styles.content}>{data?.content} </p>
        </div>
        <div
          className={cx(
            styles.more_button_container,
            !isMore && styles.close_more_button_container
          )}
        >
          <Button
            text={isMore ? '닫기' : '더보기'}
            variant="outlined"
            onClick={handleToggleMore}
          />
        </div>
        <div className={styles.post_button_container}>
          <PostingButton />
        </div>
      </div>
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
    </div>
  );
};

export default Sns;

const styles = {
  container: css({
    minWidth: '620px',
    maxWidth: '620px',
    display: 'flex',
    flexDirection: 'column',
  }),
  header: css({
    padding: '12px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'main.light0',
    borderRadius: '8px 8px 0 0',
    border: '1px solid',
    borderColor: 'main.base',
    borderBottom: 'none',
  }),
  header_button_container: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
  profile: css({
    display: 'inline-flex',
    backgroundColor: 'white',
    borderRadius: '50%',
  }),
  name: css({
    textStyle: 'body3',
    color: 'white',
  }),
  main_container: css({
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
  close_main_container: css({
    height: '568px',
    overflowY: 'hidden',
  }),
  main: css({
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
