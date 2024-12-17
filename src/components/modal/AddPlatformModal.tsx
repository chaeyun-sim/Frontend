import React, { useState } from 'react';

import { Platform } from '@/hooks/queries/members';

import { ModalProps } from './modal.interface';
import { css, cx } from '../../../styled-system/css';
import { circle, flex } from '../../../styled-system/patterns';
import Button from '../common/Button';
import Input from '../common/Input';

interface IProps extends ModalProps {
  publicPlatformList: Platform[];
  onSetPublicPlatformList: (value: Platform[]) => void;
}

const AddPlatformModal = ({
  onClose,
  publicPlatformList,
  onSetPublicPlatformList,
}: IProps) => {
  const [newUrl, setNewUrl] = useState('');
  const [activePlatform, setActivePlatform] = useState(-1);

  const platformList: Platform[] = []; // 기존 플랫폼

  const handleSave = () => {
    onSetPublicPlatformList([
      ...publicPlatformList,
      {
        platform: '치지직',
        imageUrl: platformList[activePlatform].imageUrl,
        profileUrl: '',
      },
    ]);
    setActivePlatform(-1);
    onClose();
  };

  return (
    <div className={styles.container}>
      <strong className={styles.title}>플랫폼 추가</strong>
      <div>
        <div className={styles.box}>
          {platformList.map((platform, i) => (
            <a
              className={cx(
                styles.platform,
                css({
                  borderColor: activePlatform === i ? 'main.base' : 'gray.300',
                })
              )}
              key={i}
              onClick={() => setActivePlatform(i)}
            >
              <img
                src={platform.profileUrl}
                alt=""
                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
              />
            </a>
          ))}
        </div>
        <Input
          value={newUrl}
          onSetValue={setNewUrl}
          placeholder="URL을 입력해주세요."
          style={{ width: '224px', marginTop: '12px' }}
        />
      </div>
      <div className={flex({ gap: '8px' })}>
        <Button variant="outlined" text="취소" onClick={onClose} />
        <Button variant="contained" text="저장" onClick={handleSave} />
      </div>
    </div>
  );
};

export default AddPlatformModal;

const styles = {
  container: flex({
    flexDirection: 'column',
    width: '264px',
    minHeight: '285px',
    borderRadius: '8px',
    boxShadow: 'shadow1',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 100,
    top: '459px',
    padding: '20px',
    gap: '12px',
  }),
  title: css({
    textStyle: 'body3',
    color: 'gray.900',
  }),
  box: flex({
    flexWrap: 'wrap',
    rowGap: '12px',
    columnGap: '40px',
  }),
  platform: circle({
    size: '48px',
    borderWidth: '1px',
    borderStyle: 'solid',
    overflow: 'hidden',
    cursor: 'pointer',
  }),
};
