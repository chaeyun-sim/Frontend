import { useEffect, useRef, useState } from 'react';

import Tags from './common/Tags';

const TagInput = () => {
  const editTagRef = useRef<HTMLInputElement>(null);
  const [tagList, setTagList] = useState<string[]>([]);
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
      style={{
        minHeight: '47px',
        alignItems: 'center',
        borderBottomColor: '#7C0DE4',
        borderBottomWidth: '1px',
        // width: '423px',
        display: 'flex',
        flexWrap: 'wrap',
        padding: '0 12px',
      }}
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
