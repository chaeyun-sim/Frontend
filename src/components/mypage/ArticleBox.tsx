import React from 'react';

import { ArticleType } from '@/pages/mypage';

import { css } from '../../../styled-system/css';
import { flex, vstack } from '../../../styled-system/patterns';
import Icon from '../common/Icon';

interface IProps {
  title: string;
  date: string;
  type?: ArticleType;
  pinned?: boolean;
}

const ArticleBox = ({ title, date, type, pinned }: IProps) => {
  const iconName =
    type === 'mixed' ? 'img-and-vid' : type === 'image' ? 'img' : 'video';

  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>
        {title}
        {pinned && (
          <Icon
            name="pin"
            className={css({
              width: '20px',
              height: '20px',
              marginLeft: '4px',
            })}
          />
        )}
      </span>
      <div className={styles.info_box}>
        <span className={styles.date}>{date}</span>
        <Icon name={iconName} />
      </div>
    </div>
  );
};

export default ArticleBox;

const styles = {
  wrapper: vstack({
    width: '300px',
    height: '126px',
    borderRadius: '8px',
    padding: '20px',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: 'gray.200',
    borderWidth: '1px',
    cursor: 'pointer',
  }),
  text: flex({
    width: '100%',
    textStyle: 'body1',
    color: 'gray.900',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: '46px',
  }),
  date: css({
    textStyle: 'caption2',
    color: 'gray.500',
  }),
  info_box: flex({
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }),
};
