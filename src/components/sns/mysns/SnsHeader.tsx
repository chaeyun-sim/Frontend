import Image from 'next/image';

import Button from '@/components/common/Button';

import { snsHeaderStyles } from '../sns/SnsHeader';

interface IProps {
  profileUrl: string;
  nickname: string;
}

const SnsHeader = ({ profileUrl, nickname }: IProps) => {
  return (
    <div className={snsHeaderStyles.header}>
      <div className={snsHeaderStyles.header_button_container}>
        <Image
          src={profileUrl}
          alt="profile"
          width={36}
          height={36}
          objectFit="cover"
          className={snsHeaderStyles.profile}
        />
        <div className={snsHeaderStyles.name}>{nickname}</div>
      </div>
      <div className={snsHeaderStyles.header_button_container}>
        <Button text="삭제" variant="outlined" size="small" />
        <Button text="수정" size="small" />
      </div>
    </div>
  );
};

export default SnsHeader;
