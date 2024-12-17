import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ProfileImage from '@/components/common/ProfileImage';
import Toast from '@/components/common/Toast';
import TagInput from '@/components/TagInput';
import Validations from '@/components/Validations';
import { SIGNUP_NICKNAME_VALIDATIONS } from '@/constants/signup';
import {
  useCheckNickname,
  useServeNickname,
  useSignup,
} from '@/hooks/queries/auth';
import useToast from '@/hooks/useToast';
import { useSignupStore } from '@/stores/useSignupStore';
import { getItem } from '@/utils/localStorage';
import { validateNickname } from '@/utils/validation';

import { css } from '../../../../styled-system/css';

const SignupInfo = () => {
  const router = useRouter();
  const { snsType = '' } = router.query;

  const [file, setFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [hasDuplicatedNickname, setHasDuplicatedNickname] = useState(false);
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);
  const [isValidatedNickname, setIsValidatedNickname] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [tags, setTags] = useState<string[]>([]);

  const { usageAgree, personalAgree, withdrawalAgree } = useSignupStore();

  const { toast, handleOpenToast, handleCloseToast } = useToast();

  const isFullValidatedNickname =
    isValidatedNickname[1] && isValidatedNickname[2] && isValidatedNickname[3];

  const isEnabledCheckNicknameButton =
    nickname && isFullValidatedNickname && !isDuplicatedNickname;

  const isEnabledSubmitButton =
    file && nickname && isFullValidatedNickname && isDuplicatedNickname;

  // 중복 확인
  const { refetch: checkNickname } = useCheckNickname({
    nickname,
    setHasDuplicatedNickname,
    setIsDuplicatedNickname,
    handleOpenToast,
  });

  // 랜덤 생성
  const { refetch: serveNickname } = useServeNickname({
    setNickname,
  });

  // 가입 완료
  const { mutate: signup } = useSignup({
    snsType: snsType as TSns,
    handleRedirect: () => router.push('/signup/complete'),
  });

  const handleSubmit = () => {
    if (!isEnabledSubmitButton) return;

    const request = {
      usageAgree,
      personalAgree,
      withdrawalAgree,
      oauthToken: getItem('@oauthToken'),
      nickname,
      tags,
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('request', JSON.stringify(request));

    signup(formData);
  };

  useEffect(() => {
    setIsValidatedNickname(validateNickname(nickname));
    setIsDuplicatedNickname(false);
  }, [nickname]);

  return (
    <div>
      <Toast
        isOpen={toast.isOpen}
        onClose={handleCloseToast}
        text={toast.text}
        isError={toast.isError}
      />
      <div className={styles.box}>
        <div className={styles.inner_box}>
          <div className={styles.title_box}>
            <p>프로필 이미지</p>
            <span className={styles.required}>*</span>
          </div>
          <div className={styles.image_box}>
            <ProfileImage setFile={setFile} />
          </div>
        </div>
        <div className={styles.inner_box}>
          <div className={styles.title_box}>
            <p>닉네임</p>
            <span className={styles.required}>*</span>
          </div>
          <div className={styles.input_box}>
            <Input
              value={nickname}
              onSetValue={setNickname}
              hasError={hasDuplicatedNickname && !isDuplicatedNickname}
            />
            <Button
              text="중복 확인"
              size="small"
              variant="outlined"
              disabled={!isEnabledCheckNicknameButton}
              onClick={checkNickname}
            />
            <Button text="랜덤 생성" size="small" onClick={serveNickname} />
          </div>
          <Validations
            validationList={SIGNUP_NICKNAME_VALIDATIONS}
            validated={isValidatedNickname}
            isInitial={!nickname}
          />
        </div>
        <div className={styles.inner_box}>
          <div className={styles.title_box}>
            <p>관심 분야</p>
          </div>
          <TagInput tagList={tags} setTagList={setTags} />
        </div>
      </div>
      <div className={styles.button_container}>
        <Button
          text="가입 완료"
          disabled={!isEnabledSubmitButton}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SignupInfo;

const styles = {
  box: css({
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '80px',
    border: '1px solid',
    borderColor: 'gray.100',
    borderRadius: '4px',
  }),
  inner_box: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }),
  title_box: css({
    display: 'flex',
    gap: '0.25em',
    textStyle: 'body1',
  }),
  required: css({
    color: 'red',
  }),
  image_box: css({
    display: 'flex',
    justifyContent: 'center',
  }),
  input_box: css({
    display: 'flex',
    gap: '8px',
    '& > div': {
      flexGrow: 1,
    },
  }),
  button_container: css({
    padding: '20px 0',
    display: 'flex',
    justifyContent: 'end',
  }),
};
