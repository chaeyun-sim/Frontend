import Image from 'next/image';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import { usePostFollow } from '@/hooks/queries/members';

import { css } from '../../../../styled-system/css';

interface IProps {
  profileUrl: string;
  nickname: string;
  memberId: number;
  isFollow: boolean;
  handleOpenCommentModal: () => void;
  refetchGetSnsDetail: () => void;
}

const SnsHeader = ({
  profileUrl,
  nickname,
  memberId,
  isFollow,
  handleOpenCommentModal,
  refetchGetSnsDetail,
}: IProps) => {
  const { mutate: postFollow } = usePostFollow({
    successCallback: ({ code }) => {
      if (code === 'OK') {
        refetchGetSnsDetail();
      }
    },
  });

  const handleToggleFollow = () => {
    postFollow({ memberId, isFollow: !!isFollow });
  };

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
        {!isFollow && (
          <Button
            text="팔로우"
            variant="outlined"
            size="small"
            onClick={handleToggleFollow}
          />
        )}
      </div>
      <div className={snsHeaderStyles.header_button_container}>
        <Button
          text="댓글 달기"
          variant="outlined"
          size="small"
          onClick={handleOpenCommentModal}
        />
        <button>
          <Icon name="dot-white" />
        </button>
      </div>
    </div>
  );
};

export default SnsHeader;

export const snsHeaderStyles = {
  header: css({
    padding: '12px 8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'main.light0',
    borderRadius: '8px 8px 0 0',
    border: '1px solid',
    borderColor: 'main.base',
    borderBottom: 'none',
  }),
  header_button_container: css({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  }),
  profile: css({
    display: 'inline-flex',
    backgroundColor: 'white',
    borderRadius: '50%',
  }),
  name: css({
    textStyle: 'body3',
    color: 'white',
  }),
};
