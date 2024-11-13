import { useState } from 'react';

import { usePostDailyMessage } from '@/hooks/queries/streamer';

import { css } from '../../../styled-system/css';
import IconButton from '../common/IconButton';
import Textarea from '../common/Textarea';

const TodayWordsInput = () => {
  const [message, setMessage] = useState('');

  const { mutate: postDailyMessage } = usePostDailyMessage({ setMessage });

  const handleSubmit = () => {
    postDailyMessage({ message });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <p className={styles.title}>오늘의 한마디</p>
        <IconButton icon="pen" disabled={!message} onClick={handleSubmit} />
      </div>
      <Textarea
        value={message}
        setValue={setMessage}
        placeholder="오늘의 한마디를 작성해주세요."
      />
    </div>
  );
};

export default TodayWordsInput;

const styles = {
  container: css({
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: 'main.light2',
    border: '1px solid',
    borderColor: 'main.base',
    borderRadius: '4px',
  }),
  title_container: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  title: css({
    textStyle: 'body3',
  }),
};
