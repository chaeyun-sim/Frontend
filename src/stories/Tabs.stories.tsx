import { useState } from 'react';

import Tabs from '@/components/common/Tabs';
import { SIGNUP_TERMS } from '@/constants/signup';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabList: SIGNUP_TERMS,
    selected: 'service',
    handleSelect: () => null,
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = useState('service');

    return (
      <Tabs
        {...args}
        selected={selectedValue}
        handleSelect={(value: string) => setSelectedValue(value)}
      />
    );
  },
};
