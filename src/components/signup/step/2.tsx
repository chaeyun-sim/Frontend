import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getCheckNickname, getServeNickname, postUser } from '@/apis/auth';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ProfileImage from '@/components/common/ProfileImage';
import Toast from '@/components/common/Toast';
import TagInput from '@/components/TagInput';
import Validations from '@/components/Validations';
import { SIGNUP_NICKNAME_VALIDATIONS } from '@/constants/signup';

import { css } from '../../../../styled-system/css';

interface IProps {
  handleChangeStep: (step: number) => void;
}

const SignupStep2 = ({ handleChangeStep }: IProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [hasDuplicatedNickname, setHasDuplicatedNickname] = useState(false);
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);
  const [isValidatedNickname, setIsValidatedNickname] = useState<{
    [key: number]: boolean;
  }>({
    1: false,
    2: false,
    3: false,
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [toast, setToast] = useState({
    isOpen: false,
    text: '',
    isError: false,
  });

  const isEnabledSubmitButton =
    file &&
    nickname &&
    isDuplicatedNickname &&
    isValidatedNickname[1] &&
    isValidatedNickname[2] &&
    isValidatedNickname[3];

  // 중복 확인
  const { refetch: refetchCheckNickname } = useQuery({
    queryKey: ['checkNickname'],
    queryFn: async () => {
      try {
        const { code } = await getCheckNickname(nickname);
        if (code === 'OK') {
          setHasDuplicatedNickname(true);
          setIsDuplicatedNickname(true);
          handleOpenToast('사용 가능한 아이디입니다.', false);
        }

        return null;
      } catch (e: any) {
        if (e.code === 'DUPLICATED_NICKNAME_ERROR') {
          setHasDuplicatedNickname(true);
          setIsDuplicatedNickname(false);
          handleOpenToast('중복된 아이디입니다.', true);
        }
      }
    },
    enabled: false,
  });

  // 랜덤 생성
  const { refetch: refetchServeNickname } = useQuery({
    queryKey: ['serveNickname'],
    queryFn: async () => {
      const { code, data } = await getServeNickname();
      if (code === 'OK') {
        setNickname(data.nicknames[0]);
      }
      return null;
    },
    enabled: false,
  });

  // 가입 완료
  const mutation = useMutation({
    mutationFn: (formData: FormData) => postUser('KAKAO', formData),
    onSuccess: ({ code }) => {
      if (code === 'OK') {
        handleChangeStep(2);
      }
    },
  });

  const handleOpenToast = (text: string, isError: boolean) => {
    setToast({ isOpen: true, text, isError });
  };
  const handleCloseToast = () => {
    setToast({ isOpen: false, text: '', isError: false });
  };

  const handleSubmit = () => {
    if (!isEnabledSubmitButton) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('nickname', nickname);
    interests.forEach((interest) => {
      formData.append('interests', interest);
    });

    mutation.mutate(formData);
  };

  useEffect(() => {
    const regex1 = nickname.length < 13; // 12자 이하
    const regex2 = /^[a-zA-Z0-9가-힣!@#$%^&*()\-_+={}[\];:',.<>/?\\|`~"·]*$/; // 한글, 영문, 숫자, 특수문자 사용 가능
    const regex3 = /^[a-zA-Z0-9가-힣()\-_:]*$/; // 특수문자 (  )   -   _   : 사용 가능

    setIsValidatedNickname({
      1: regex1,
      2: regex2.test(nickname),
      3: regex3.test(nickname),
    });
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
              disabled={
                !(
                  nickname &&
                  isValidatedNickname[1] &&
                  isValidatedNickname[2] &&
                  isValidatedNickname[3]
                ) || isDuplicatedNickname
              }
              onClick={refetchCheckNickname}
            />
            <Button
              text="랜덤 생성"
              size="small"
              onClick={refetchServeNickname}
            />
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
          <TagInput tagList={interests} setTagList={setInterests} />
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

export default SignupStep2;

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
