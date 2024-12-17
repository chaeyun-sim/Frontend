import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { peoples } from '@/constants/dummyData';

import Icon from './common/Icon';
import PersonBox from './PersonBox';
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
    const filtered = peoples.filter((p) => p.includes(keyword));
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
            <PersonBox
              hasAdd
              data={p}
              keyword={keyword}
              onClick={handleClickItem}
            />
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
};
