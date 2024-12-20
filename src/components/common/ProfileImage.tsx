import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Icon from './Icon';
import { css, cx } from '../../../styled-system/css';

interface IProps {
  setFile: (value: File) => void;
  initialValue?: string;
}

const ProfileImage = ({ setFile, initialValue }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValue);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <button
        className={cx(
          styles.img_box,
          css({ borderColor: imageUrl ? 'main.base' : 'gray.300' })
        )}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        onClick={handleClick}
      >
        {!imageUrl && isHovering && (
          <Image
            src="/dark-blur.png"
            alt="dark blur"
            width={120}
            height={120}
          />
        )}
        {!imageUrl && !isHovering && (
          <Image
            src="/light-blur.png"
            alt="light blur"
            width={120}
            height={120}
          />
        )}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded profile"
            width={120}
            height={120}
            objectFit="cover"
          />
        )}
        {!imageUrl && (
          <div className={styles.box}>
            <Icon name={isHovering ? 'camera-white' : 'camera-dark'} />
            <span
              className={cx(
                styles.text,
                css({ color: isHovering ? 'white' : 'gray.900' })
              )}
            >
              이미지 선택
            </span>
          </div>
        )}
      </button>
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        hidden
        onChange={handleUploadImage}
      />
    </div>
  );
};

export default ProfileImage;

const styles = {
  img_box: css({
    width: '120px',
    height: '120px',
    borderRadius: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: '1px',
    overflow: 'hidden',
  }),
  box: css({
    zIndex: 10,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  text: css({
    textStyle: 'caption1',
    marginTop: '8px',
  }),
};
