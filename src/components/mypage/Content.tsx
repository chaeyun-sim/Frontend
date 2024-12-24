import Image from 'next/image';

import { useMyPage } from '@/hooks/useMyPage';
import { useTab } from '@/hooks/useTab';
import { useCheckMyPage } from '@/stores/useCheckMyPage';

import ArticleBox from './ArticleBox';
import CommentBox from './CommentBox';
import { css, cx } from '../../../styled-system/css';
import { center, flex, wrap } from '../../../styled-system/patterns';

const TAB = {
  ARTICLES: '내 게시물',
  COMMENTS: '내가 쓴 댓글',
} as const;

const Content = () => {
  const { isMyPage, memberId } = useCheckMyPage();
  const { posts, comments } = useMyPage({
    memberId: String(memberId),
  });
  const { activeTab, isActive, handleTabChange } = useTab({
    tabs: Object.values(TAB),
    initialValue: '내가 쓴 댓글',
  });

  if (!posts?.length) {
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

  return (
    <>
      {isMyPage ? (
        <div>
          <div className={cx(styles.title_box, flex({ gap: '20px' }))}>
            {['내가 쓴 댓글', '내 게시물'].map((item) => (
              <button key={item} onClick={() => handleTabChange(item)}>
                <p
                  className={cx(
                    styles.article_title,
                    css({
                      color: isActive(item) ? '#7C0DE4' : '#d9d9d9',
                    })
                  )}
                >
                  {item}
                </p>
              </button>
            ))}
          </div>
          {activeTab === TAB.ARTICLES && (
            <div className={wrap({ gap: '20px' })}>
              {posts?.map((article) => (
                <ArticleBox key={article.postId} {...article} />
              ))}
            </div>
          )}
          {activeTab === TAB.COMMENTS && (
            <div className={wrap({ gap: '20px' })}>
              {comments?.map((comment) => (
                <CommentBox key={comment.commentInfo.commentId} {...comment} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className={styles.title_box}>
            <p className={cx(styles.article_title, css({ cursor: 'default' }))}>
              게시글 ({posts.length})
            </p>
          </div>
          <div className={styles.article_wrap}>
            {posts?.map((article) => (
              <ArticleBox key={article.postId} {...article} />
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
    columnGap: '20px',
  }),
};
