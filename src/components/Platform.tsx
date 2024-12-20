import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { circle } from '../../styled-system/patterns';

interface IProps {
  platform: string;
  imageUrl: string;
  profileUrl: string;
}

const Platform = ({ platform, imageUrl, profileUrl }: IProps) => {
  return (
    <Link href={profileUrl} className={platform}>
      <Image
        src={''}
        alt={platform}
        width={24}
        height={24}
        loading="lazy"
        style={{ height: '24px', objectFit: 'cover' }}
        className={styles.platform}
      />
    </Link>
  );
};

export default Platform;

const styles = {
  platform: circle({
    size: '24px',
    borderColor: 'main.base',
    borderWidth: '1px',
    overflow: 'hidden',
  }),
};
