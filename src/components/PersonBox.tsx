import Image from 'next/image';
import React from 'react';

import Icon from './common/Icon';
import { css } from '../../styled-system/css';

interface IProps {
  onClick?: (value: string) => void;
  data: string;
  keyword: string;
  hasAdd?: boolean;
}

const PersonBox = ({ data, keyword, onClick, hasAdd }: IProps) => {
  const highlightText = (text: string) => {
    if (!keyword.trim()) return text;

    const regex = new RegExp(`(${keyword})`, 'gi');
    const parts = text.split(regex);

    return (
      <span className={styles.name}>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <span key={i} className={css({ color: 'main.base' })}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Image
          src={
            'https://images.unsplash.com/photo-1730343464315-a9ca01f9f1c6?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
          alt="profile"
          width={36}
          height={36}
          style={{ objectFit: 'cover' }}
        />
      </div>
      {keyword === '' ? (
        <span className={styles.name}>{data}</span>
      ) : (
        <span className={styles.name}>{highlightText(data)}</span>
      )}
      {hasAdd && (
        <button className={styles.add_btn} onClick={() => onClick!(data)}>
          <Icon name="add2" />
        </button>
      )}
    </div>
  );
};

export default PersonBox;

const styles = {
  item: css({
    padding: '16px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    position: 'relative',
    borderBottomColor: 'gray.100',
    borderBottomWidth: '1px',
    '&:last-child': {
      borderBottom: 'none',
    },
  }),
  image: css({
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  }),
  name: css({
    textStyle: 'body4',
    color: 'gray.900',
  }),
  add_btn: css({
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
};
