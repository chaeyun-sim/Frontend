import React, { useEffect, useRef } from 'react';

import { useSearchMember } from '@/hooks/queries/sns';

import PersonBox from './PersonBox';
import { css } from '../../styled-system/css';

interface IProps {
  keyword: string;
  isDropdownOpen: boolean;
  onClickItem: (memberId: number) => void;
  onCloseDropdown: () => void;
}

const SelectPeopleDropdown = ({
  keyword,
  isDropdownOpen,
  onClickItem,
  onCloseDropdown,
}: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: members, refetch } = useSearchMember(keyword);

  useEffect(() => {
    refetch();
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

  return (
    <>
      {isDropdownOpen && members && (
        <div className={styles.wrapper} ref={dropdownRef}>
          {members.map((member) => (
            <PersonBox
              key={member.memberId}
              data={member.nickname}
              keyword={keyword}
              hasAdd
              onClick={() => onClickItem(member.memberId)}
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
