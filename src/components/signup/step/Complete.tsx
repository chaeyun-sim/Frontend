import Link from 'next/link';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import { css } from '../../../../styled-system/css';

const SignupComplete = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <Icon name="celebrate-lg" />
        <p className={styles.title}>가입이 완료되었습니다!</p>
        <p>다양한 서비스 이용을 위해 로그인해주세요.</p>
      </div>
      <div className={styles.button_container}>
        <Link href={'/?from=signup-complete'}>
          <Button text="로그인하러 가기" />
        </Link>
      </div>
    </div>
  );
};

export default SignupComplete;

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
  box: css({
    margin: '100px 0',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    borderRadius: '8px',
    backgroundColor: 'main.light2',
  }),
  title: css({
    textStyle: 'title1',
  }),
  button_container: css({
    padding: '20px 0',
    '& button': {
      width: 200,
    },
  }),
};
