import { useRouter } from 'next/router';

import JoinProcess from '@/components/JoinProcess';
import Complete from '@/components/signup/step/Complete';
import Info from '@/components/signup/step/Info';
import Terms from '@/components/signup/step/Terms';
import Title from '@/components/signup/Title';
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
      <Title />
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
};
