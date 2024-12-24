import Image from 'next/image';
import React from 'react';

import Icon from './common/Icon';
import { css } from '../../styled-system/css';

interface IProps {
  onClick?: (value: string) => void;
  data: {
    memberId: string;
    profile: string;
    nickname: string;
  };
  keyword: string;
  hasAdd?: boolean;
  onClickNavigate?: () => void;
}

const PersonBox = ({
  data,
  keyword,
  onClickNavigate,
  onClick,
  hasAdd,
}: IProps) => {
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
    <button className={styles.item} onClick={onClickNavigate}>
      <div className={styles.image}>
        <Image
          src={data?.profile}
          alt="profile"
          width={36}
          height={36}
          style={{ objectFit: 'cover' }}
        />
      </div>
      {keyword === '' ? (
        <span className={styles.name}>{data?.nickname}</span>
      ) : (
        <span className={styles.name}>{highlightText(data?.nickname)}</span>
      )}
      {hasAdd && (
        <button
          className={styles.add_btn}
          onClick={() => onClick!(data?.memberId)}
        >
          <Icon name="add2" />
        </button>
      )}
    </button>
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
