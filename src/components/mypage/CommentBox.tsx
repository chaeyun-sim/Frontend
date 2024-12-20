import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Comment } from '@/hooks/queries/members';

import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import Icon from '../common/Icon';

const CommentBox = (props: Comment) => {
  const { postInfo, commentInfo } = props;

  const getMediaIcon = () => {
    if (postInfo.hasImage && postInfo.hasVideo) {
      return 'img-and-vid';
    } else if (postInfo.hasImage) {
      return 'img';
    } else if (postInfo.hasVideo) {
      return 'video';
    } else {
      return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <Link href={`/sns/my/${postInfo.postId}`} className={styles.title}>
        {postInfo.title}
        {getMediaIcon() && (
          <Icon
            name={getMediaIcon() as string}
            className={css({ position: 'absolute', right: 0, top: 0 })}
          />
        )}
      </Link>
      <div className={flex({ marginTop: '8px', alignItems: 'center' })}>
        <Image
          src={postInfo.memberImageUrl}
          alt="profile"
          width={24}
          height={24}
          style={{ width: '24px', height: '24px', borderRadius: '24px' }}
        />
        <span className={styles.name}>{postInfo.memberName}</span>
      </div>
      <div className={css({ width: '100%', marginTop: '22px' })}>
        <div
          className={cx(styles.comment_wrap, css({ borderColor: 'gray.300' }))}
        >
          <strong className={styles.comment_title}>댓글</strong>
          <span className={styles.comment}>{commentInfo.content}</span>
        </div>
        <div
          className={cx(
            styles.comment_wrap,
            css({ height: '102px', borderColor: 'main.base', marginTop: '8px' })
          )}
        >
          <strong className={styles.comment_title}>답글</strong>
          <span
            className={cx(
              styles.comment,
              css({
                color:
                  commentInfo.replyContent.length > 0 ? 'gray.500' : 'gray.200',
              })
            )}
          >
            {commentInfo.replyContent || '아직 답글이 달리지 않았습니다.'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;

const styles = {
  wrapper: css({
    width: '300px',
    height: '309px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: 'gray.200',
    padding: '20px',
  }),
  title: flex({
    textStyle: 'body1',
    color: 'gray.900',
    width: '100%',
    position: 'relative',
  }),
  name: css({
    marginLeft: '8px',
    textStyle: 'caption2',
    color: 'gray.900',
  }),
  comment_wrap: flex({
    height: '83px',
    padding: '12px',
    gap: '4px',
    borderRadius: '8px',
    borderWidth: '1px',
    flexDir: 'column',
  }),
  comment_title: css({ textStyle: 'caption1', color: 'gray.900' }),
  comment: css({
    textStyle: 'button2',
    color: 'gray.300',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
};
