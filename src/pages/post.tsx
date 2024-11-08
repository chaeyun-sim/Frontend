import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Tabs from '@/components/common/Tabs';
import GoToStreamerModal from '@/components/modal/GoToStreamerModal';
import SelectPeopleDropdown from '@/components/SelectPeopleDropdown';
import VisibilityOption from '@/components/VisibilityOption';
import { useCreatePost } from '@/hooks/queries/sns';

import { css, cx } from '../../styled-system/css';
import { center } from '../../styled-system/patterns';

const ToastEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [selectedTab, setSelectedTab] = useState<'1' | '2'>('1');
  const [isPublic, setIsPublic] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [showPublicList, setShowPublicList] = useState<string[]>([]); // TODO: 추후 User[]로 변경
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<string>('');

  const { mutate: createPost } = useCreatePost({ successCallback: () => null });

  useEffect(() => {
    setIsDropdownOpen(!!searchText);
  }, [searchText]);

  const handleClickDropdown = (person: string) => {
    setShowPublicList([...showPublicList, person]);
  };

  // TODO: User 데이터가 없어 index로 대신함
  const handleDeleteSelected = (index: number) => {
    setShowPublicList(showPublicList.filter((_, i) => i !== index));
  };

  const handleEditorChange = (value: string) => setContent(value);

  const handleSubmit = () =>
    createPost({
      postType: 'MEMBER',
      title,
      content,
      publicMembers: showPublicList,
      privateMembers: [],
    });

  return (
    <div className={styles.container}>
      {isModalOpen && (
        <Modal
          onClose={() => setSelectedTab('1')}
          className={css({ width: 320, height: 196 })}
        >
          <GoToStreamerModal onClose={() => setIsModalOpen(false)} />
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
        <div className={styles.wrapper}>
          <Tabs
            type="line"
            tabList={[
              { id: '1', value: '일반 글쓰기' },
              {
                id: '2',
                value: '방송 글쓰기',
                disabled: true,
                iconName: 'lock',
              },
            ]}
            selected={selectedTab}
            handleSelect={setSelectedTab}
            handleSelectDisabled={() => setIsModalOpen(true)}
          />
          <div className={styles.visibility_settings}>
            <VisibilityOption
              value={isPublic}
              onClick={() => setIsPublic(!isPublic)}
              label="공개 설정"
            />
          </div>
          <div style={{ padding: '0 16px' }}>
            <Input
              value={searchText}
              onSetValue={setSearchText}
              onClick={() => setIsPublic(true)}
              placeholder="사용자를 입력해주세요."
            />
            <SelectPeopleDropdown
              keyword={searchText}
              onClickItem={handleClickDropdown}
              onCloseDropdown={() => setIsDropdownOpen(false)}
              isDropdownOpen={isDropdownOpen}
            />
          </div>
          <div className={styles.selected_list}>
            <div className={styles.selected_box}>
              {/* TODO: User 데이터가 없어서 임시로 인덱스 전달 */}
              {showPublicList.slice(0, 4).map((item, i) => (
                <button
                  key={i}
                  className={styles.profile_box_wrapper}
                  onClick={() => handleDeleteSelected(i)}
                >
                  <div className={styles.profile_box}>
                    <Image
                      src={
                        'https://images.unsplash.com/photo-1730343464315-a9ca01f9f1c6?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      }
                      alt="selected profile"
                      width={36}
                      height={36}
                      objectFit="cover"
                    />
                  </div>
                  <div className={styles.delete_btn}>
                    <Icon
                      name="delete-btn-red"
                      className={css({ width: 12, height: 12 })}
                    />
                  </div>
                </button>
              ))}
              {showPublicList.length > 4 && (
                <div className={cx(styles.profile_box_wrapper, center())}>
                  + {showPublicList.length - 4}
                </div>
              )}
            </div>
          </div>
          <div className={styles.visibility_settings}>
            <VisibilityOption
              value={!isPublic}
              onClick={() => setIsPublic(!isPublic)}
              label="비공개 설정"
            />
          </div>
          <div className={styles.save_btn}>
            <Button
              text="저장"
              size="fullWidth"
              disabled={!title || !content}
              onClick={handleSubmit}
            />
          </div>
        </div>
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
  wrapper: css({
    boxShadow: 'shadow1',
    width: '100%',
    height: '574px',
    marginTop: '58px',
    borderRadius: '8px',
    position: 'relative',
  }),
  visibility_settings: css({
    width: '100%',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textStyle: 'body3',
    color: 'gray.900',
  }),
  selected_list: css({
    padding: '16px',
    width: '100%',
  }),
  selected_box: css({
    padding: '16px',
    backgroundColor: 'main.light2',
    height: '68px',
    display: 'flex',
    gap: '14px',
  }),
  profile_box_wrapper: css({
    width: '36px',
    height: '36px',
    position: 'relative',
  }),
  profile_box: css({
    width: 'inherit',
    height: 'inherit',
    borderRadius: '50%',
    borderColor: 'main.base',
    borderWidth: '1px',
    overflow: 'hidden',
  }),
  delete_btn: css({
    position: 'absolute',
    top: 0,
    right: 0,
  }),
  save_btn: css({
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: '16px',
  }),
};
