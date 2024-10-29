import { useState } from 'react';

import JoinProcess from '@/components/JoinProcess';
import SignupStep1 from '@/components/signup/step/1';
import SignupStep2 from '@/components/signup/step/2';
import SignupStep3 from '@/components/signup/step/3';
import { SIGNUP_PROCESS_STEPS } from '@/constants/signup';

import { css } from '../../styled-system/css';

const SignupPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleChangeStep = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div>
      <div className={styles.process_container}>
        <JoinProcess
          processSteps={SIGNUP_PROCESS_STEPS}
          currentStep={currentStep}
        />
      </div>
      {currentStep !== 2 && (
        <div className={styles.title_container}>
          <h2 className={styles.title}>회원가입</h2>
          <h3 className={styles.subTitle}>
            가입을 통해 다양한 서비스를 이용해보세요!
          </h3>
        </div>
      )}
      {currentStep === 0 && <SignupStep1 handleChangeStep={handleChangeStep} />}
      {currentStep === 1 && <SignupStep2 handleChangeStep={handleChangeStep} />}
      {currentStep === 2 && <SignupStep3 />}
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
