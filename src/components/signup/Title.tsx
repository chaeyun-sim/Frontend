import { SIGNUP_SUB_TITLES } from '@/constants/signup';

import { css } from '../../../styled-system/css';

interface IProps {
  currentStep: string;
}

const SignupTitle = ({ currentStep }: IProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      <h3 className={styles.subTitle}>{SIGNUP_SUB_TITLES[currentStep]}</h3>
    </div>
  );
};

export default SignupTitle;

const styles = {
  container: css({
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }),
  title: css({
    textStyle: 'title1',
  }),
  subTitle: css({
    color: 'gray.500',
  }),
};
