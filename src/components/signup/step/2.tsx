import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getCheckNickname, getServeNickname, postUser } from '@/apis/auth';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ProfileImage from '@/components/common/ProfileImage';
import TagInput from '@/components/TagInput';
import Validations from '@/components/Validations';
import { SIGNUP_NICKNAME_VALIDATIONS } from '@/constants/signup';

import { css } from '../../../../styled-system/css';

interface IProps {
  handleChangeStep: (step: number) => void;
}

const SignupStep2 = ({ handleChangeStep }: IProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [isDuplicatedNickname, setIsDuplicatedNickname] = useState(false);
  const [isValidatedNickname, setIsValidatedNickname] = useState<{
    [key: number]: boolean;
  }>({
    1: false,
    2: false,
    3: false,
  });
  const [interests, setInterests] = useState<string[]>([]);

  const isEnabledSubmitButton =
    image &&
    nickname &&
    isDuplicatedNickname &&
    isValidatedNickname[1] &&
    isValidatedNickname[2] &&
    isValidatedNickname[3] &&
    interests.length;

  // 중복 확인
  const { refetch: refetchCheckNickname } = useQuery({
    queryKey: ['checkNickname'],
    queryFn: async () => {
      const { code } = await getCheckNickname(nickname);
      if (code === 'OK') {
        setIsDuplicatedNickname(true);
      }
    },
    enabled: !!nickname,
  });

  // 랜덤 생성
  const { refetch: refetchServeNickname } = useQuery({
    queryKey: ['serveNickname'],
    queryFn: async () => {
      const { code, data } = await getServeNickname();
      if (code === 'OK') {
        setNickname(data.nicknames[0]);
      }
    },
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

  const handleSubmit = () => {
    if (!isEnabledSubmitButton) return;

    const formData = new FormData();
    formData.append('image', image);
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

    if (nickname) {
      setIsValidatedNickname({
        1: regex1,
        2: regex2.test(nickname),
        3: regex3.test(nickname),
      });
    } else {
      setIsValidatedNickname({ 1: false, 2: false, 3: false });
    }
  }, [nickname]);

  return (
    <div>
      <div className={styles.box}>
        <div className={styles.inner_box}>
          <p className={styles.title}>프로필 이미지</p>
          <div className={styles.image_box}>
            <ProfileImage setImage={setImage} />
          </div>
        </div>
        <div className={styles.inner_box}>
          <p className={styles.title}>닉네임</p>
          <div className={styles.input_box}>
            <Input value={nickname} onSetValue={setNickname} />
            <Button
              text="중복 확인"
              size="small"
              variant="outlined"
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
          />
        </div>
        <div className={styles.inner_box}>
          <p className={styles.title}>관심 분야</p>
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
  title: css({
    textStyle: 'body1',
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
