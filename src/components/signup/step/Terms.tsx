import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import Tabs from '@/components/common/Tabs';
import { SIGNUP_TERMS, SIGNUP_TERMS_CONTENT } from '@/constants/signup';
import { useSignupStore } from '@/stores/useSignupStore';

import { css } from '../../../../styled-system/css';

const SignupTerms = () => {
  const router = useRouter();
  const { snsType = '' } = router.query;

  const [selectedTerm, setSelectedTerm] = useState<TSignupTerm>('service');
  const [isAgreedTerm, setIsAgreedTerm] = useState<{
    [key in TSignupTerm]: boolean;
  }>({
    service: false,
    privacy: false,
    withdrawal: false,
  });

  const { usageAgree, personalAgree, withdrawalAgree, setTerms } =
    useSignupStore();

  const isEnabledNextButton =
    isAgreedTerm['service'] &&
    isAgreedTerm['privacy'] &&
    isAgreedTerm['withdrawal'];

  const handleSelectTab = (tab: TSignupTerm) => {
    setSelectedTerm(tab);
  };

  const handleAgreeTerm = (term: TSignupTerm) => {
    setIsAgreedTerm({ ...isAgreedTerm, [term]: !isAgreedTerm[term] });
  };

  const handleClickNextButton = () => {
    setTerms({
      usageAgree: isAgreedTerm['service'],
      personalAgree: isAgreedTerm['privacy'],
      withdrawalAgree: isAgreedTerm['withdrawal'],
    });
    router.push(`/signup/info?snsType=${snsType}`);
  };

  useEffect(() => {
    setIsAgreedTerm({
      service: usageAgree,
      privacy: personalAgree,
      withdrawal: withdrawalAgree,
    });
  }, [usageAgree, personalAgree, withdrawalAgree]);

  return (
    <div>
      <Tabs
        tabList={SIGNUP_TERMS}
        selected={selectedTerm}
        handleSelect={handleSelectTab}
      />
      <div className={styles.terms_container}>
        <div className={styles.checkbox_container}>
          <CheckBox
            checked={isAgreedTerm[selectedTerm]}
            handleCheck={() => handleAgreeTerm(selectedTerm)}
            label="동의"
          />
          <CheckBox
            checked={!isAgreedTerm[selectedTerm]}
            handleCheck={() => handleAgreeTerm(selectedTerm)}
            label="비동의"
          />
        </div>
        <div className={styles.devider}></div>
        <div>{SIGNUP_TERMS_CONTENT[selectedTerm]}</div>
      </div>
      <div className={styles.button_container}>
        <Button
          text="다음"
          disabled={!isEnabledNextButton}
          onClick={handleClickNextButton}
        />
      </div>
    </div>
  );
};

export default SignupTerms;

const styles = {
  terms_container: css({
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  }),
  checkbox_container: css({
    display: 'flex',
    gap: '40px',
  }),
  devider: css({
    width: '100%',
    height: '1px',
    backgroundColor: 'gray.100',
  }),
  button_container: css({
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'end',
  }),
};
