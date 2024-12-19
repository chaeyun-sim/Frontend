import Image from 'next/image';
import React, { useState } from 'react';

import { CommentInfo, PostInfo } from '@/hooks/queries/members';
import { useMyPage } from '@/hooks/useMyPage';
import { useAuth } from '@/stores/useAuth';

import ArticleBox from './ArticleBox';
import CommentBox from './CommentBox';
import { css, cx } from '../../../styled-system/css';
import { center, flex, wrap } from '../../../styled-system/patterns';

const articleList: PostInfo[] = [
  {
    postId: 1,
    title: '게시물1',
    createdDate: '2024.11.01',
    hasImage: true,
    hasVideo: false,
    isPinned: true,
    content: '내용1',
  },
  {
    postId: 2,
    title: '게시물2',
    createdDate: '2024.11.01',
    hasImage: false,
    hasVideo: true,
    isPinned: true,
    content: '내용2',
  },
  {
    postId: 3,
    title: '게시물3',
    createdDate: '2024.11.01',
    hasImage: true,
    hasVideo: true,
    isPinned: true,
    content: '내용3',
  },
];

const TAB = {
  ARTICLES: '내 게시물',
  COMMENTS: '내가 쓴 댓글',
} as const;

const Content = () => {
  const { memberId } = useAuth();

  const { isMyPage, /*posts,*/ comments } = useMyPage({
    memberId: String(memberId),
  });
  const [currentItem, setCurrentItem] = useState('내가 쓴 댓글');

  const posts = {
    postInfos: articleList,
  };

  if (!articleList) {
    return (
      <div className={styles.wrapper}>
        <Image
          src="/icons/no-result.svg"
          alt="no text written"
          width={217}
          height={167}
        />
      </div>
    );
  }

  const handleSelectItem = (value: string) => setCurrentItem(value);

  return (
    <>
      {isMyPage ? (
        <div>
          <div className={cx(styles.title_box, flex({ gap: '20px' }))}>
            {['내가 쓴 댓글', '내 게시물'].map((item) => (
              <button key={item} onClick={() => handleSelectItem(item)}>
                <p
                  className={cx(
                    styles.article_title,
                    css({
                      color: currentItem === item ? 'main.base' : 'gray.300',
                    })
                  )}
                >
                  {item}
                </p>
              </button>
            ))}
          </div>
          {currentItem === TAB.ARTICLES && (
            <div className={wrap({ gap: '20px' })}>
              {posts?.postInfos?.map((article) => (
                <ArticleBox key={article.title} {...article} />
              ))}
            </div>
          )}
          {currentItem === TAB.COMMENTS && (
            <div className={wrap({ gap: '20px' })}>
              {comments?.comments.map((comment) => (
                <CommentBox key={comment.content} {...comment} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className={styles.title_box}>
            <p className={cx(styles.article_title, css({ cursor: 'default' }))}>
              게시글 ({articleList.length})
            </p>
          </div>
          <div className={wrap({ justifyContent: 'space-between' })}>
            {articleList.map((article) => (
              <ArticleBox key={article.title} {...article} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Content;

const styles = {
  wrapper: center({
    width: '100%',
    height: '350px',
  }),
  article_title: css({
    textStyle: 'body1',
    color: 'gray.900',
  }),
  title_box: flex({
    padding: '16px 0',
    marginTop: '12px',
    gap: '20px',
  }),
  article_wrap: css({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    rowGap: '20px',
  }),
};
