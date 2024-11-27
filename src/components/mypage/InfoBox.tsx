import Image from 'next/image';
import React, { useState } from 'react';

import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import ProfileImage from '@/components/common/ProfileImage';
import { useMyPage } from '@/hooks/useMyPage';
import { useToggle } from '@/hooks/useToggle';
import { useEditMyPage } from '@/stores/useEditMyPage';

import { css, cx } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import Button from '../common/Button';

interface FormData {
  image: File;
  name: string;
  description: string;
  tags: string[];
}

interface IProps {
  memberId: string;
}

const InfoBox = ({ memberId }: IProps) => {
  const { isMyPage, profileInfo } = useMyPage({ memberId });
  const { isEditing, setIsEditing } = useEditMyPage();
  const [inputs, setInputs] = useState<FormData>({
    image: null as unknown as File,
    name: '',
    description: '',
    tags: [],
  });

  const handleUpdateProfile = () => setIsEditing(false);

  return (
    <div className={styles.info_box}>
      {isEditing ? (
        <ProfileImage
          setFile={(file) => setInputs({ ...inputs, image: file })}
        />
      ) : (
        <div className={cx(styles.profile_wrap, center())}>
          {profileInfo?.imageUrl.length ? (
            <Image
              src={profileInfo?.imageUrl as string}
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
                value={inputs.name}
                onSetValue={(name) => {
                  setInputs({ ...inputs, name: name });
                }}
                className={styles.name_input}
              />
            </div>
          ) : (
            <span>{profileInfo?.nickName}</span>
          )}
          {!isMyPage && (
            <Button
              className={styles.follow_btn}
              variant={profileInfo?.isFollowing ? 'outlined' : 'contained'}
              text={profileInfo?.isFollowing ? '팔로우 취소' : '팔로우'}
            />
          )}
        </div>
        <div className={css({ height: isEditing ? '56px' : '44.5px' })}>
          {isEditing ? (
            <textarea className={cx(styles.description, styles.textarea)} />
          ) : (
            <span className={styles.description}>
              {profileInfo?.selfIntroduction}
            </span>
          )}
        </div>
        <div
          className={cx(
            styles.tags,
            css({ marginTop: isEditing ? '0.5px' : '12px' })
          )}
        >
          {profileInfo?.interests.map((tag) => (
            <button className={styles.tag} key={tag}>
              {tag}
            </button>
          ))}
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
    backgroundColor: 'main.light2',
    color: 'main.base',
    height: '22px',
    textStyle: 'caption3',
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
};
