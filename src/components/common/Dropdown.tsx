import React, { useEffect, useRef, useState } from 'react';

import { css, cx } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

interface IProps {
  className?: string;
  tags: string[];
  keyword: string;
  textAlign?: 'left' | 'right' | 'center';
  setValue: (value: string) => void;
  onClose: () => void;
}

const Dropdown = ({
  className,
  tags,
  keyword,
  textAlign,
  setValue,
  onClose,
}: IProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [focusedItem, setFocusedItem] = useState('');
  const [data, setData] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent) => {
    const currentIndex = tags?.indexOf(focusedItem);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentIndex < tags?.length - 1) {
        setFocusedItem(tags?.[currentIndex + 1]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex > 0) {
        setFocusedItem(tags?.[currentIndex - 1]);
      }
    } else if (e.key === 'Enter') {
      if (!focusedItem) return;
      setValue(focusedItem);
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedItem]);

  useEffect(() => {
    if (keyword) {
      setData(tags.filter((tag) => tag.startsWith(keyword)));
    } else {
      setData(tags);
    }
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={dropdownRef} className={cx(styles.dropdown_container, className)}>
      {data?.map((item) => (
        <button
          className={cx(
            styles.dropdown_item,
            css({
              backgroundColor: focusedItem === item ? 'main.light2' : 'white',
              justifyContent: textAlign,
            })
          )}
          onFocus={() => setFocusedItem(item)}
          onClick={() => {
            setValue(item);
            onClose();
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Dropdown;

const styles = {
  dropdown_container: css({
    width: '200px',
    zIndex: 100,
    boxShadow: 'shadow2',
  }),
  dropdown_item: flex({
    width: '100%',
    height: '31px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 12px',
    textStyle: 'button2',
    color: 'gray.900',
    outline: 'none',
  }),
};
