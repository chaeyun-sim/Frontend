import dynamic from 'next/dynamic';

import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import GoToStreamerModal from '@/components/modal/GoToStreamerModal';
import SelectPublicArea from '@/components/post/SelectPublicArea';
import { useModal } from '@/hooks/useModal';
import { usePostContent } from '@/stores/usePostContent';

import { css } from '../../styled-system/css';

const ToastEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

const PostPage = () => {
  const { title, setTitle } = usePostContent();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          className={css({ width: 320, height: 196 })}
        >
          <GoToStreamerModal onClose={closeModal} />
        </Modal>
      )}
      <div className={styles.editor_area}>
        <Input
          value={title}
          onSetValue={setTitle}
          placeholder="제목을 입력해주세요."
          maxLength={50}
        />
        <ToastEditor />
      </div>
      <div className={styles.options_area}>
        <SelectPublicArea onSelectDisabled={() => openModal('')} />
      </div>
    </div>
  );
};

export default PostPage;

const styles = {
  container: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '40px',
  }),
  editor_area: css({
    width: '620px',
    height: '100%',
  }),
  options_area: css({
    width: '300px',
  }),
};
