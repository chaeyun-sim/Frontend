import dynamic from 'next/dynamic';
import { useState } from 'react';

import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import GoToStreamerModal from '@/components/modal/GoToStreamerModal';
import SelectPublicArea from '@/components/post/SelectPublicArea';
import { useModal } from '@/hooks/useModal';

import { css } from '../../styled-system/css';

const ToastEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [selectedTab, setSelectedTab] = useState<'1' | '2'>('1');
  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [content, setContent] = useState<string>('');

  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  const handleEditorChange = (value: string) => setContent(value);

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
        <ToastEditor onChange={handleEditorChange} />
      </div>
      <div className={styles.options_area}>
        <SelectPublicArea
          searchText={searchText}
          selectedTab={selectedTab}
          isDropdownOpen={isDropdownOpen}
          content={content}
          title={title}
          onSetSearchText={setSearchText}
          onSetSelectedTab={setSelectedTab}
          onCloseDropdown={() => setIsDropdownOpen(false)}
          onOpenDropdown={() => setIsDropdownOpen(true)}
          onSelectDisabled={() => openModal('')}
        />
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
