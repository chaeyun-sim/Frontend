import Image from 'next/image';
import { useState } from 'react';

import { css } from '../../../styled-system/css';
import Button from '../common/Button';
import Textarea from '../common/Textarea';

interface IProps {
  profileUrl: string;
  nickname: string;
  comment: string;
}

const Comment = ({ profileUrl, nickname, comment }: IProps) => {
  const [reply, setReply] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.profile_container}>
          <Image
            src={profileUrl}
            alt="profile"
            width={36}
            height={36}
            className={styles.profile}
          />
          <span className={styles.name}>{nickname}</span>
        </div>
        <Button text="신고" size="small" variant="outlined" />
      </div>
      <p className={styles.comment}>{comment}</p>
      <Textarea
        value={reply}
        setValue={setReply}
        placeholder="답글을 입력해주세요."
      />
    </div>
  );
};

export default Comment;

const styles = {
  container: css({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    border: '1px solid',
    borderColor: 'gray.100',
    borderRadius: '4px',
  }),
  header: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  profile_container: css({ display: 'flex', alignItems: 'center', gap: '8px' }),
  profile: css({
    backgroundColor: 'white',
    borderRadius: '50%',
    objectFit: 'cover',
  }),
  name: css({ textStyle: 'body3' }),
  comment: css({
    color: 'gray.700',
  }),
};
