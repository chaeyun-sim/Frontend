import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  forwardRef,
  ForwardedRef,
} from 'react';

import Icon from './Icon';
import { css, cx } from '../../../styled-system/css';

export interface IProps {
  isEditing: boolean;
  text?: string;
  onSetTagList?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  handleBlur?: () => void;
}

const Tags = forwardRef(
  (
    { isEditing, text, onSetTagList, onTagRemove, handleBlur }: IProps,
    ref?: ForwardedRef<HTMLInputElement>
  ) => {
    const [tag, setTag] = useState('');
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (spanRef.current && ref && 'current' in ref && ref.current) {
        const spanWidth = spanRef.current.getBoundingClientRect().width;
        const inputPadding =
          parseInt(getComputedStyle(ref.current).paddingLeft) +
          parseInt(getComputedStyle(ref.current).paddingRight);
        const newWidth = Math.max(spanWidth + inputPadding, 27);
        ref.current.style.width = `${newWidth}px`;
      }
    }, [tag, ref]);

    const handleAddTag = (e: ChangeEvent<HTMLInputElement>) => {
      setTag(e.target.value);
    };

    const handleKeyEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing && onSetTagList) {
        onSetTagList(tag);
        setTag('');
      }
    };

    const handleTagRemove = () => {
      if (onTagRemove) {
        onTagRemove(tag);
      }
    };

    return isEditing ? (
      <div className={cx(styles.tag_container, css({ marginLeft: '-8px' }))}>
        <input
          ref={ref}
          value={tag}
          onChange={handleAddTag}
          onKeyDown={handleKeyEnter}
          onBlur={handleBlur}
          className={styles.tag_editing}
          placeholder=""
          style={{ fontWeight: 500 }}
        />
        <span ref={spanRef} className={styles.hidden_span}>
          {tag || ''}
        </span>
      </div>
    ) : (
      <button
        className={cx(styles.tag_container, styles.tag)}
        onClick={handleTagRemove}
      >
        <span style={{ fontWeight: 500 }}>{text}</span>
        <Icon name="close-sm" />
      </button>
    );
  }
);

export default Tags;

const styles = {
  tag_container: css({
    borderRadius: '4px',
    textStyle: 'button1',
    padding: '5px 10px',
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
    margin: '2px',
  }),
  tag: css({
    height: '31px',
    backgroundColor: 'main.base',
    borderWidth: '1px',
    borderColor: 'main.base',
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px',
  }),
  tag_editing: css({
    outline: 'none',
    borderWidth: '1px',
    borderColor: 'main.base',
    borderRadius: '4px',
    color: 'black',
    background: 'transparent',
    margin: '0',
    minWidth: '27px',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    padding: '5px 8px',
  }),
  hidden_span: css({
    visibility: 'hidden',
    position: 'absolute',
    top: '0',
    left: '0',
    whiteSpace: 'pre',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    letterSpacing: 'inherit',
    opacity: '0',
    padding: '5px 1px',
  }),
};
