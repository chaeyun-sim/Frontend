import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Platform as IPlatform } from '@/hooks/queries/members';

import { circle } from '../../styled-system/patterns';

const Platform = ({ name, imageUrl, profileUrl }: IPlatform) => {
  return (
    <Link href={profileUrl} className={styles.platform}>
      <Image
        src={imageUrl}
        alt={name}
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
