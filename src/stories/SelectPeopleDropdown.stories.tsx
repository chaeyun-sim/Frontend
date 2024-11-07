import { useEffect, useState } from 'react';

import Input from '@/components/common/Input';
import SelectPeopleDropdown from '@/components/SelectPeopleDropdown';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/SelectPeopleDropdown',
  component: SelectPeopleDropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectPeopleDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    keyword: '이',
    isDropdownOpen: true,
    onClickItem: () => {},
    onCloseDropdown: () => {},
  },
};

export const WithInput: Story = {
  args: {
    keyword: '',
    isDropdownOpen: false,
    onClickItem: () => {},
    onCloseDropdown: () => {},
  },
  render: () => {
    const [value, setValue] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (!value) setOpen(false);
      else setOpen(true);
    }, [value]);

    return (
      <>
        <Input
          value={value}
          onSetValue={setValue}
          onClick={() => {}}
          placeholder="사용자를 입력해주세요."
        />
        <SelectPeopleDropdown
          keyword={value}
          onClickItem={() => null}
          onCloseDropdown={() => setOpen(false)}
          isDropdownOpen={open}
        />
      </>
    );
  },
};
