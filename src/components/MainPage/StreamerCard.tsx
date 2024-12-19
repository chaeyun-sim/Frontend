import Image from 'next/image';

import Tag from './Tag';
import { css } from '../../../styled-system/css';
import { center, flex } from '../../../styled-system/patterns';
import Icon from '../common/Icon';
import Platform from '../Platform';

interface IProps {
  imageUrl: string;
  interestedList: { name: string; isInterested: boolean }[];
  name: string;
  todayComment: string;
  selfIntroduction: string;
  platformList: { platform: string; imageUrl: string; profileUrl: string }[];
}

const StreamerCard = ({
  imageUrl,
  interestedList,
  name,
  todayComment,
  selfIntroduction,
  platformList,
}: IProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.notice_box}>
        <div style={{ position: 'absolute', left: '5px' }}>
          <Icon name="megaphone" />
        </div>
        <span className={styles.notice_text}>{todayComment}</span>
      </button>
      <div className={styles.profile_image}>
        <Image
          src={imageUrl}
          alt="profile"
          className={styles.image}
          width={220}
          height={207}
        />
      </div>
      <div className={styles.content}>
        <div className={flex({ gap: '4px' })}>
          {interestedList.map((item) => (
            <Tag
              key={item.name}
              isSelected={item.isInterested}
              onClickTag={() => null}
            >
              {item.name}
            </Tag>
          ))}
        </div>
        <p className={styles.name}>{name}</p>
        <p className={styles.desc}>{selfIntroduction}</p>
        <div className={styles.platforms_wrapper}>
          {platformList.map((platform) => (
            <Platform key={platform.platform} {...platform} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;

const styles = {
  container: css({
    maxWidth: '220px',
    width: '100%',
    height: '356px',
    borderRadius: '8px',
    borderColor: 'gray.200',
    borderWidth: '1px',
    overflow: 'hidden',
    position: 'relative',
  }),
  profile_image: css({
    width: '100%',
    height: '207px',
  }),
  content: css({
    padding: '16px',
  }),
  image: css({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }),
  name: css({
    marginTop: '8px',
    textStyle: 'title2',
    color: 'gray.900',
    fontWeight: '700',
  }),
  desc: css({
    textStyle: 'body4',
    color: 'gray.500',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginTop: '8px',
  }),
  platforms_wrapper: flex({
    marginTop: '8px',
    alignItems: 'center',
    gap: '8px',
  }),
  notice_box: center({
    position: 'absolute',
    borderRadius: '100px',
    backgroundColor: 'white',
    width: '24px',
    height: '24px',
    top: '15px',
    left: '15px',
    transition: 'width 0.6s ease',
    '& > span': {
      visibility: 'hidden',
      transition: 'visibility 0.1s',
    },
    '&:hover': {
      width: '190px',
      cursor: 'default',
      '& > span': {
        visibility: 'visible',
        transition: 'visibility 0.1s 0.25s ease',
      },
    },
  }),
  notice_text: css({
    textStyle: 'caption3',
    color: 'gray.900',
  }),
};
