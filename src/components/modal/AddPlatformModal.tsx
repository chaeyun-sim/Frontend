import React, { useState } from 'react';

import { Platform } from '@/hooks/queries/platforms';
import { usePlatform } from '@/hooks/usePlatform';
import { useTab } from '@/hooks/useTab';
import { useCheckMyPage } from '@/stores/useCheckMyPage';

import { ModalProps } from './modal.interface';
import { css, cx } from '../../../styled-system/css';
import { circle, flex } from '../../../styled-system/patterns';
import Button from '../common/Button';
import Input from '../common/Input';

const AddPlatformModal = ({ onClose }: ModalProps) => {
  const { memberId } = useCheckMyPage();
  const { platformList, addPlatform } = usePlatform(memberId);
  const { activeTab, isActive, handleTabChange } = useTab({
    tabs: platformList,
  });

  const [newUrl, setNewUrl] = useState('');

  const handleSave = () => {
    addPlatform(
      {
        platformId: activeTab.id,
        platformProfileUrl: newUrl,
      },
      {
        onSuccess: onClose,
      }
    );
  };

  return (
    <div className={styles.container}>
      <strong className={styles.title}>플랫폼 추가</strong>
      <div className={css({ height: '90px' })}>
        <div className={styles.box}>
          {platformList?.map((platform: Platform) => (
            <a
              className={cx(
                styles.platform,
                css({
                  borderColor: isActive(platform) ? 'main.base' : 'gray.300',
                })
              )}
              key={platform.id}
              onClick={() => handleTabChange(platform)}
            >
              <img
                src={platform.imageUrl}
                alt={platform.name}
                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
              />
            </a>
          ))}
        </div>
      </div>
      <Input
        value={newUrl}
        onSetValue={setNewUrl}
        placeholder="URL을 입력해주세요."
        style={{ width: '224px', marginTop: '12px' }}
      />
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
