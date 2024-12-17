import { useRouter } from 'next/router';

import JoinProcess from '@/components/JoinProcess';
import Complete from '@/components/signup/step/Complete';
import Info from '@/components/signup/step/Info';
import Terms from '@/components/signup/step/Terms';
import { SIGNUP_PROCESS_STEPS } from '@/constants/signup';

import { css } from '../../../styled-system/css';

const SignupPage = () => {
  const router = useRouter();
  const { step } = router.query;

  return (
    <div>
      <div className={styles.process_container}>
        <JoinProcess
          processSteps={SIGNUP_PROCESS_STEPS}
          currentStep={Number(step)}
        />
      </div>
      {step !== 'complete' && (
        <div className={styles.title_container}>
          <h2 className={styles.title}>회원가입</h2>
          <h3 className={styles.subTitle}>
            {step === 'terms'
              ? '가입을 통해 다양한 서비스를 이용해보세요!'
              : step === 'info'
                ? '서비스 이용을 위해 사용자 정보를 입력해주세요.'
                : ''}
          </h3>
        </div>
      )}
      {step === 'terms' && <Terms />}
      {step === 'info' && <Info />}
      {step === 'complete' && <Complete />}
    </div>
  );
};

export default SignupPage;

const styles = {
  process_container: css({
    padding: '40px 0',
  }),
  title_container: css({
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
