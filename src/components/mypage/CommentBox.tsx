import Image from 'next/image';
import React from 'react';

import { CommentInfo } from '@/hooks/queries/members';

import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import Icon from '../common/Icon';

const CommentBox = (props: CommentInfo) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        게시물 제목
        <Icon
          name="img"
          className={css({ position: 'absolute', right: 0, top: 0 })}
        />
      </div>
      <div className={flex({ marginTop: '8px', alignItems: 'center' })}>
        <Image
          src="https://plus.unsplash.com/premium_photo-1700520223771-bb3a599755d1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="profile"
          width={24}
          height={24}
          style={{ width: '24px', height: '24px', borderRadius: '24px' }}
        />
        <span className={styles.name}>누군가</span>
      </div>
      <div className={css({ width: '100%', marginTop: '22px' })}>
        <div
          className={cx(styles.comment_wrap, css({ borderColor: 'gray.300' }))}
        >
          <strong className={styles.comment_title}>댓글</strong>
          <span className={styles.comment}>{props.content}</span>
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
                color: props.replyContent.length > 0 ? 'gray.500' : 'gray.200',
              })
            )}
          >
            {props.replyContent || '아직 답글이 달리지 않았습니다.'}
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
  title: css({
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
