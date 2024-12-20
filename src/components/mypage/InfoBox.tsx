import Image from 'next/image';
import React, { KeyboardEvent, useEffect, useState } from 'react';

import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import ProfileImage from '@/components/common/ProfileImage';
import { ProfileInfo, useGetTagDropdown } from '@/hooks/queries/members';
import { useModal } from '@/hooks/useModal';
import { useMyPage } from '@/hooks/useMyPage';
import { useCheckMyPage } from '@/stores/useCheckMyPage';
import { useEditMyPage } from '@/stores/useEditMyPage';

import { css, cx } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';

const InfoBox = () => {
  const { isMyPage, memberId } = useCheckMyPage();
  const { profileInfo, updateProfile, toggleFollow } = useMyPage({
    memberId: String(memberId),
  });

  const { isEditing, setIsEditing } = useEditMyPage();
  const { isOpen, openModal, closeModal } = useModal();

  const [inputs, setInputs] = useState<
    Omit<ProfileInfo, 'imageUrl'> & { imageUrl: string | File }
  >(profileInfo!);
  const [inputWidth, setInputWidth] = useState(1);
  const [newTag, setNewTag] = useState('');

  const { data: tagsToSearch, refetch } = useGetTagDropdown(newTag);

  useEffect(() => {
    refetch();
  }, [newTag]);

  useEffect(() => {
    if (profileInfo?.nickname) {
      setInputs({
        ...profileInfo,
        tags: profileInfo.tags ?? [],
        imageUrl: profileInfo.imageUrl,
      });
    }
  }, [profileInfo]);

  const handleUpdateProfile = () => {
    const request = {
      nickname: inputs?.nickname,
      selfIntroduction: inputs?.selfIntroduction,
      tagList: inputs?.tags,
    };

    const formData = new FormData();
    formData.append('file', inputs?.imageUrl);
    formData.append('request', JSON.stringify(request));

    updateProfile({
      data: formData,
      successHandler: () => setIsEditing(false),
    });
  };

  const handleTagDelete = (value: string) => {
    setInputs({ ...inputs, tags: inputs.tags.filter((tag) => tag !== value) });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const measureTextWidth = (text: string) => {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.position = 'absolute';
    span.style.whiteSpace = 'pre';
    span.style.fontSize = '12px';
    span.style.fontFamily = 'inherit';
    span.textContent = text;

    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);

    return width;
  };

  useEffect(() => {
    const width = measureTextWidth(newTag);
    setInputWidth(Math.max(20, width + 4));

    if (newTag.length > 0) {
      openModal('');
    } else {
      closeModal();
    }
  }, [newTag]);

  const handleInputFocus = () => {
    if (newTag.length > 0) {
      openModal('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim() && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setInputs({
        ...inputs,
        tags: [...inputs.tags, newTag.trim()],
      });
      setNewTag('');
    }
  };

  const handleFollow = () => {
    toggleFollow({
      isFollow: !inputs?.isFollowing,
    });
  };

  return (
    <div className={styles.info_box}>
      {isEditing ? (
        <ProfileImage
          setFile={(file) => setInputs({ ...inputs, imageUrl: file })}
          initialValue={profileInfo?.imageUrl as string}
        />
      ) : (
        <div className={cx(styles.profile_wrap, center())}>
          {inputs?.imageUrl ? (
            <Image
              src={inputs?.imageUrl as string}
              alt=""
              width={120}
              height={120}
              style={{ objectFit: 'cover', height: '100%' }}
            />
          ) : (
            <Icon name="headphone" className={css({ width: '60px' })} />
          )}
        </div>
      )}

      <div className={styles.info_wrap}>
        <div className={styles.name_box}>
          {isEditing ? (
            <div style={{ height: '37px', marginBottom: '8px' }}>
              <Input
                value={inputs?.nickname}
                onSetValue={(name) => {
                  setInputs({ ...inputs, nickname: name });
                }}
                className={styles.name_input}
              />
            </div>
          ) : (
            <span>{inputs?.nickname}</span>
          )}
          {!isMyPage && (
            <Button
              className={styles.follow_btn}
              variant={inputs?.isFollowing ? 'outlined' : 'contained'}
              text={inputs?.isFollowing ? '팔로우 취소' : '팔로우'}
              onClick={handleFollow}
            />
          )}
        </div>
        <div className={css({ height: isEditing ? '56px' : '44.5px' })}>
          {isEditing ? (
            <textarea
              className={cx(styles.description, styles.textarea)}
              value={inputs?.selfIntroduction ?? ''}
              onChange={(e) =>
                setInputs({ ...inputs, selfIntroduction: e.target.value })
              }
            />
          ) : (
            <span
              className={cx(
                styles.description,
                !inputs?.selfIntroduction &&
                  css({ fontSize: '15px', color: 'gray.400' })
              )}
            >
              {inputs?.selfIntroduction || '소개글을 작성해주세요.'}
            </span>
          )}
        </div>
        <div
          className={cx(
            styles.tags,
            css({ marginTop: isEditing ? '0.5px' : '12px' })
          )}
        >
          {inputs?.tags?.map((tag) => (
            <button
              className={cx(
                styles.tag,
                isEditing ? styles.edit_tag : styles.default_tag
              )}
              key={tag}
              onClick={() => handleTagDelete(tag)}
            >
              {tag}
              {isEditing && (
                <Icon
                  name="close-sm"
                  className={css({ width: '16px', height: '16px' })}
                />
              )}
            </button>
          ))}
          {isEditing && (
            <div>
              <div className={cx(styles.tag, styles.add_tag)}>
                <input
                  style={{ width: `${inputWidth}px` }}
                  value={newTag}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyDown={handleKeyDown}
                />
              </div>
              {isOpen && (
                <Dropdown
                  className={styles.dropdown}
                  tags={tagsToSearch?.data.tagList ?? []}
                  keyword={newTag}
                  setValue={(value) => {
                    setNewTag(value);
                    setInputs({
                      ...inputs,
                      tags: [...inputs.tags, newTag],
                    });
                    setNewTag('');
                  }}
                  onClose={closeModal}
                  textAlign="left"
                />
              )}
            </div>
          )}
        </div>
        {isMyPage && isEditing && (
          <div
            className={flex({
              gap: '8px',
              position: 'absolute',
              right: 0,
              top: '-5px',
            })}
          >
            <Button
              text="취소"
              size="small"
              variant="outlined"
              className={css({ height: '35px' })}
              onClick={() => setIsEditing(false)}
            />
            <Button
              text="저장"
              size="small"
              className={css({ height: '35px' })}
              onClick={handleUpdateProfile}
            />
          </div>
        )}
      </div>
      {isMyPage && !isEditing && (
        <button className={styles.edit_wrap} onClick={() => setIsEditing(true)}>
          <Icon name="edit" />
        </button>
      )}
    </div>
  );
};

export default InfoBox;

const styles = {
  info_box: flex({
    width: '740px',
    height: '160px',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: 'shadow1',
    padding: '20px',
    position: 'relative',
  }),
  profile_wrap: css({
    width: '120px',
    height: '120px',
    borderRadius: '120px',
    borderColor: 'main.base',
    borderWidth: '1px',
    overflow: 'hidden',
  }),
  info_wrap: css({
    marginLeft: '20px',
    flex: 1,
    position: 'relative',
  }),
  name_box: flex({
    textStyle: 'title1',
    color: 'gray.900',
    height: '35px',
    alignItems: 'center',
    marginBottom: '9px',
  }),
  follow_btn: center({
    marginLeft: '12px',
    width: '97px !important',
    height: '100%',
    borderRadius: '4px',
    padding: '12px 8px',
    backgroundColor: 'main.base',
    color: 'white',
    textStyle: 'button2',
  }),
  description: css({
    textStyle: 'body4',
    color: 'gray.900',
  }),
  tags: flex({
    alignItems: 'center',
    gap: '12px',
  }),
  tag: center({
    padding: '8px',
    borderRadius: '20px',
    height: '24px',
    textStyle: 'caption3',
  }),
  default_tag: css({
    backgroundColor: 'main.light2',
    color: 'main.base',
  }),
  edit_tag: center({
    backgroundColor: 'main.base',
    color: 'white',
    display: 'flex',
    gap: '10px',
  }),
  edit_wrap: css({
    position: 'absolute',
    right: '20px',
    cursor: 'pointer',
  }),
  textarea: css({
    height: '56px',
    resize: 'none',
    width: '100%',
    borderColor: 'main.base',
    borderWidth: '1px',
    outline: 'none',
    wordBreak: 'break-all',
    overflow: 'hidden',
    borderRadius: '4px',
    padding: '8px',
    marginTop: '-8px',
  }),
  name_input: css({
    textStyle: 'body3',
    color: 'gray.900',
    outline: 'none',
    fontWeight: 'bold',
    padding: '0 12px',
  }),
  add_tag: css({
    borderColor: 'main.base',
    borderWidth: '1px',
    '& > input': {
      outline: 'none',
      minWidth: '20px',
      maxWidth: '100px',
    },
  }),
  dropdown: css({
    position: 'absolute',
    top: '130px',
  }),
};
