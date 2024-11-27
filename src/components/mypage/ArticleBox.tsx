import React from 'react';

import { PostInfo } from '@/hooks/queries/members';

import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';
import Icon from '../common/Icon';

const ArticleBox = ({ ...props }: PostInfo) => {
  const getIconName = () => {
    if (props.hasImage && props.hasVideo) {
      return 'img-and-vid';
    } else if (props.hasImage) {
      return 'img';
    } else if (props.hasVideo) {
      return 'video';
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        <span className={css({ flex: 1 })}>{props.title}</span>
        {props.isPinned && (
          <Icon
            name="pin"
            className={css({
              width: '20px',
              height: '20px',
              marginLeft: '4px',
            })}
          />
        )}
      </div>
      <div className={styles.info_box}>
        <span className={styles.date}>{props.createdDate}</span>
        <Icon name={getIconName() as string} />
      </div>
    </div>
  );
};

export default ArticleBox;

const styles = {
  wrapper: flex({
    flexDirection: 'column',
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
