import Image from 'next/image';
import Link from 'next/link';

import Tag from './Tag';
import { css } from '../../../styled-system/css';
import { flex } from '../../../styled-system/patterns';

interface IProps {
  imageUrl: string;
  interestedList: { name: string; isInterested: boolean }[];
  name: string;
  // description: string;
  profileUrl: string;
}

const StreamerCard = ({
  imageUrl,
  interestedList,
  name,
  // description
  profileUrl,
}: IProps) => {
  let description = '안녕하세요 이번에 새로 시작한 스트리머입니다.';
  const imagesData = ['youtube', 'chzzk', 'sooplive'];
  console.log(imageUrl);

  return (
    <Link href={profileUrl}>
      <div className={styles.container}>
        <div className={styles.profile_image}>
          <img src={imageUrl} alt="profile" className={styles.image} />
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
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.desc}>{description}</p>
          <div className={styles.platforms_wrapper}>
            {imagesData.map((item) => (
              <Image
                key={item}
                src={''}
                alt="platform - "
                className={styles.platforms}
                width={24}
                height={24}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default StreamerCard;

const styles = {
  container: css({
    width: '220px',
    height: '356px',
    borderRadius: '8px',
    borderColor: 'gray.200',
    borderWidth: '1px',
    overflow: 'hidden',
  }),
  profile_image: css({
    width: '220px',
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
  }),
  platforms_wrapper: flex({
    marginTop: '8px',
    alignItems: 'center',
    gap: '8px',
  }),
  platforms: css({
    backgroundColor: 'tomato',
    width: '24px',
    height: '24px',
    borderRadius: '100%',
    borderColor: 'main.base',
    borderWidth: '1px',
  }),
};
