import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import Icon from './Icon';
import { css, cx } from '../../../styled-system/css';

interface IProps {
  image: string;
  setImage: (value: string) => void;
}

const ProfileImage = ({ image, setImage }: IProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <button
        className={cx(
          styles.img_box,
          css({ borderColor: image ? 'main.base' : 'gray.300' })
        )}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        onClick={handleClick}
      >
        {!image && isHovering && <img src="/dark-blur.png" alt="dark blur" />}
        {!image && !isHovering && (
          <img src="/light-blur.png" alt="light blur" />
        )}
        {image && (
          <img
            src={image}
            alt="Uploaded profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {!image && (
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
    fontWeight: '500',
    marginTop: '8px',
  }),
};
