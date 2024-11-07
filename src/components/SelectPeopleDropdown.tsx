import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { peoples } from '@/constants/dummyData';

import Icon from './common/Icon';
import { css } from '../../styled-system/css';

interface IProps {
  keyword: string;
  isDropdownOpen: boolean;
  onClickItem: (item: string) => void;
  onCloseDropdown: () => void;
}

const SelectPeopleDropdown = ({
  keyword,
  isDropdownOpen,
  onClickItem,
  onCloseDropdown,
}: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<string[]>(peoples);

  useEffect(() => {
    const filtered = peoples.filter((p) => p.startsWith(keyword));
    setData(filtered);
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onCloseDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCloseDropdown]);

  const handleClickItem = (value: string) => {
    onClickItem(value);
    setData(data.filter((item) => item !== value));
  };

  return (
    <>
      {isDropdownOpen && data.length > 0 && (
        <div className={styles.wrapper} ref={dropdownRef}>
          {data.map((p) => (
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
              <span className={styles.name}>
                <span className={css({ color: 'main.base' })}>{keyword}</span>
                {p.split(keyword)[1]}
              </span>
              <button
                className={styles.add_btn}
                onClick={() => handleClickItem(p)}
              >
                <Icon name="add2" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectPeopleDropdown;

const styles = {
  wrapper: css({
    width: '268px',
    height: '204px',
    overflowY: 'scroll',
    borderRadius: '4px',
    borderColor: 'gray.100',
    borderWidth: '1px',
    marginTop: '8px',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'none',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'main.base',
      borderRadius: '4px',
    },
  }),
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
