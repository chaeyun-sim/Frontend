import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { ArticleType } from '@/pages/mypage';

import ArticleBox from './ArticleBox';
import CommentBox from './CommentBox';
import { css, cx } from '../../../styled-system/css';
import { center, flex, wrap } from '../../../styled-system/patterns';

interface Article {
  title: string;
  date: string;
  type?: ArticleType;
  pinned?: boolean;
}

const articleList: Article[] = [
  {
    title: '게시물 제목 최대 2줄 게시물 제목 최대 2줄 게시물 제목 최대 2',
    date: '2024.11.01',
    type: 'image',
    pinned: true,
  },
  {
    title: '게시물 제목 최대 2줄 게시물 제목 최대 2줄 게시물 제목 최대 2',
    date: '2024.11.01',
    type: 'image',
    pinned: true,
  },
  {
    title: '게시물 제목 최대 2줄 게시물 제목 최대 2줄 게시물 제목 최대 2',
    date: '2024.11.01',
    type: 'image',
    pinned: true,
  },
];

const commentList = [
  {
    comment:
      '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 ',
    reply:
      '답글 내용 답글 내용 답글 내용 답글 내용 답글 내용 답글 내용 답글 내용 답글 내용 답글 내용 답글 내용 답글 내용 ',
  },
  {
    comment:
      '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 ',
    reply: '',
  },
  {
    comment:
      '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 ',
    reply: '',
  },
  {
    comment:
      '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 ',
    reply: '',
  },
];

const TAB = {
  ARTICLES: '내 게시물',
  COMMENTS: '내가 쓴 댓글',
} as const;

const Content = ({ isFromMe }: { isFromMe: boolean }) => {
  const [currentItem, setCurrentItem] = useState('내가 쓴 댓글');

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
      {isFromMe ? (
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
              {articleList.map((article) => (
                <ArticleBox key={article.title} {...article} />
              ))}
            </div>
          )}
          {currentItem === TAB.COMMENTS && (
            <div className={wrap({ gap: '20px' })}>
              {commentList.map((comment) => (
                <CommentBox key={comment.comment} {...comment} />
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
