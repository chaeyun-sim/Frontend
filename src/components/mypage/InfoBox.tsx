import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import ProfileImage from '@/components/common/ProfileImage';
import { ProfileInfo } from '@/hooks/queries/members';
import { useModal } from '@/hooks/useModal';
import { useMyPage } from '@/hooks/useMyPage';
import { useEditMyPage } from '@/stores/useEditMyPage';

import { css, cx } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';

interface IProps {
  memberId: string;
}

const InfoBox = ({ memberId }: IProps) => {
  const { isMyPage, profileInfo } = useMyPage({ memberId });
  const { isEditing, setIsEditing } = useEditMyPage();
  const { isOpen, openModal, closeModal } = useModal();

  const [inputs, setInputs] = useState<ProfileInfo>({
    imageUrl: '',
    nickName: '김철수',
    selfIntroduction:
      '안녕하세요 전세계를 돌아다니며 맛집을 찾아다니는 BJ 김철수입니다~~안녕하세요 전세계를 돌아다니며 맛집을 찾아다니는 BJ 김철수입니다~~',
    interests: ['뉴욕맛집', '미국여행', '자동차'],
    isFollowing: false,
  });
  const [inputWidth, setInputWidth] = useState(1);
  const [newTag, setNewTag] = useState('');

  const handleUpdateProfile = () => setIsEditing(false);

  const data = profileInfo || inputs;

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

  return (
    <div className={styles.info_box}>
      {isEditing ? (
        <ProfileImage
          setFile={(file) => setInputs({ ...inputs, imageUrl: String(file) })}
        />
      ) : (
        <div className={cx(styles.profile_wrap, center())}>
          {data?.imageUrl ? (
            <Image
              src={data?.imageUrl as string}
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
                value={inputs.nickName}
                onSetValue={(name) => {
                  setInputs({ ...inputs, nickName: name });
                }}
                className={styles.name_input}
              />
            </div>
          ) : (
            <span>{data?.nickName}</span>
          )}
          {!isMyPage && (
            <Button
              className={styles.follow_btn}
              variant={data?.isFollowing ? 'outlined' : 'contained'}
              text={data?.isFollowing ? '팔로우 취소' : '팔로우'}
            />
          )}
        </div>
        <div className={css({ height: isEditing ? '56px' : '44.5px' })}>
          {isEditing ? (
            <textarea
              className={cx(styles.description, styles.textarea)}
              value={inputs.selfIntroduction}
              onChange={(e) =>
                setInputs({ ...inputs, selfIntroduction: e.target.value })
              }
            />
          ) : (
            <span className={styles.description}>{data?.selfIntroduction}</span>
          )}
        </div>
        <div
          className={cx(
            styles.tags,
            css({ marginTop: isEditing ? '0.5px' : '12px' })
          )}
        >
          {data?.interests.map((tag) => (
            <button
              className={cx(
                styles.tag,
                isEditing ? styles.edit_tag : styles.default_tag
              )}
              key={tag}
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
                />
              </div>
              {isOpen && (
                <Dropdown
                  className={styles.dropdown}
                  tags={['tag1', 'tag2', 'tag3', 'tag4']}
                  keyword={newTag}
                  setValue={(value) => {
                    setNewTag(value);
                    setInputs({
                      ...inputs,
                      interests: [...inputs.interests, newTag],
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
