import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { center } from '../../styled-system/patterns';

interface IProps {
  platform: string;
  imageUrl: string;
  profileUrl: string;
}

const Platform = ({ platform, imageUrl, profileUrl }: IProps) => {
  return (
    <Link href={profileUrl} className={platform}>
      <Image
        src={imageUrl}
        alt={platform}
        width={24}
        height={24}
        loading="lazy"
      />
    </Link>
  );
};

export default Platform;

const platform = center({
  width: '24px',
  height: '24px',
  borderRadius: '100%',
  borderColor: 'main.base',
  borderWidth: '1px',
  overflow: 'hidden',
});
