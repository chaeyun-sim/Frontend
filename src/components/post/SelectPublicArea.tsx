import React, { useState } from 'react';

import { useCreatePost } from '@/hooks/queries/sns';
import { useModal } from '@/hooks/useModal';
import { useTab } from '@/hooks/useTab';
import { useToggle } from '@/hooks/useToggle';
import { usePostContent } from '@/stores/usePostContent';

import { css, cx } from '../../../styled-system/css';
import { center } from '../../../styled-system/patterns';
import Avatar from '../Avatar';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import Input from '../common/Input';
import Tabs from '../common/Tabs';
import SelectPeopleDropdown from '../SelectPeopleDropdown';

interface IProps {
  onSelectDisabled: () => void;
}

const SelectPublicArea = ({ onSelectDisabled }: IProps) => {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]); // TODO: 추후 User[]로 변경
  const [searchMember, setSearchMember] = useState('');

  const {
    isOpen: isDropdownOpen,
    openModal: openDropdown,
    closeModal: closeDropdown,
  } = useModal();
  const { title, content } = usePostContent();
  const { activeTab, handleTabChange } = useTab<'1' | '2'>({
    tabs: ['1', '2'],
    initialValue: '1',
  });
  const { value: isPublic, handleToggle: togglePublic } = useToggle();

  const { mutate: createPost } = useCreatePost();

  const handleAddPublicPeople = (memberId: number) => {
    setSelectedMembers([...selectedMembers, memberId]);
  };

  // TODO: User 데이터가 없어 index로 대신함
  const handleRemovePublicPeople = (index: number) => {
    setSelectedMembers(selectedMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = () =>
    createPost({
      postType: 'MEMBER',
      title,
      content,
      publicMembers: selectedMembers,
      privateMembers: [],
    });

  return (
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
        selected={activeTab}
        handleSelect={handleTabChange}
        handleSelectDisabled={onSelectDisabled}
      />
      <div className={styles.visibility_settings}>
        <CheckBox
          checked={isPublic!}
          handleCheck={togglePublic}
          label="공개 설정"
        />
      </div>
      <div className={styles.visibility_settings}>
        <CheckBox
          checked={!isPublic}
          handleCheck={togglePublic}
          label="비공개 설정"
        />
      </div>
      <div style={{ padding: '0 16px' }}>
        <Input
          value={searchMember}
          onSetValue={setSearchMember}
          onClick={() => openDropdown('')}
          hidePlaceholderOnFocus
          placeholder={
            isPublic
              ? '이 글을 숨길 사용자를 입력해주세요.'
              : '이 글을 보여줄 사용자를 입력해주세요.'
          }
        />
        <SelectPeopleDropdown
          keyword={searchMember}
          onClickItem={handleAddPublicPeople}
          onCloseDropdown={closeDropdown}
          isDropdownOpen={isDropdownOpen}
        />
      </div>
      <div className={styles.selected_list}>
        <div className={styles.selected_box}>
          {/* TODO: User 데이터가 없어서 임시로 인덱스 전달 */}
          {selectedMembers.slice(0, 4).map((item, i) => (
            <Avatar key={item} onClick={() => handleRemovePublicPeople(i)} />
          ))}
          {selectedMembers.length > 4 && (
            <div className={cx(styles.profile_box_wrapper, center())}>
              + {selectedMembers.length - 4}
            </div>
          )}
        </div>
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
  );
};

export default SelectPublicArea;

const styles = {
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
  save_btn: css({
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: '16px',
  }),
  profile_box_wrapper: css({
    width: '36px',
    height: '36px',
    position: 'relative',
  }),
};
