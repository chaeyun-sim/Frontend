import { useEffect, useRef, useState } from 'react';

import Tags from './common/Tags';
import { css, cx } from '../../styled-system/css';

interface IProps {
  tagList: string[];
  setTagList: (value: string[]) => void;
}

const TagInput = ({ tagList, setTagList }: IProps) => {
  const editTagRef = useRef<HTMLInputElement>(null);
  const [addTag, setAddTag] = useState(false);

  useEffect(() => {
    if (addTag) {
      editTagRef.current?.focus();
    }
  }, [addTag]);

  const handleSetTagList = (tag: string) => {
    if (!tagList.includes(tag) && tagList.length < 5) {
      setTagList([...tagList, tag]);
      setAddTag(tagList.length < 4);
    }
  };

  const handleTagRemove = (tag: string) => {
    setTagList(tagList.filter((el) => el !== tag));
    setAddTag(false);
  };

  return (
    <div
      className={cx(
        styles.input_container,
        addTag ? styles.focus : styles.default
      )}
      onClick={() => (tagList.length < 5 && !addTag ? setAddTag(true) : null)}
    >
      {tagList.map((tag) => (
        <Tags
          key={tag}
          isEditing={false}
          text={tag}
          onTagRemove={() => handleTagRemove(tag)}
        />
      ))}
      {tagList.length < 5 && addTag && (
        <Tags
          ref={editTagRef}
          isEditing
          onSetTagList={handleSetTagList}
          onTagRemove={handleTagRemove}
          handleBlur={() => setAddTag(false)}
        />
      )}
    </div>
  );
};

export default TagInput;

const styles = {
  input_container: css({
    minHeight: '47px',
    alignItems: 'center',
    borderBottomWidth: '1px',
    // width: '423px',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 12px',
  }),
  default: css({
    borderBottomColor: 'gray.300',
  }),
  focus: css({
    borderBottomColor: 'main.base',
  }),
};
