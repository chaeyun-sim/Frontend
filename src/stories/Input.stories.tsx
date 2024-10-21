import { useState } from 'react';

import Icon from '@/components/common/Icon';
import Input from '@/components/common/Input';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '',
    onSetValue: () => null,
    hasError: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onSetValue={setValue} />;
  },
};

export const Disabled: Story = {
  args: {
    value: '',
    onSetValue: () => null,
    hasError: false,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onSetValue={setValue} />;
  },
};

export const Error: Story = {
  args: {
    value: '',
    onSetValue: () => null,
    hasError: true,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return <Input {...args} value={value} onSetValue={setValue} />;
  },
};

export const Placholder: Story = {
  args: {
    value: '',
    onSetValue: () => null,
    hasError: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <Input
        {...args}
        value={value}
        onSetValue={setValue}
        placeholder="값을 입력하세요."
      />
    );
  },
};

export const RightIcon: Story = {
  args: {
    value: '',
    onSetValue: () => null,
    hasError: false,
    disabled: false,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <Input
        {...args}
        value={value}
        onSetValue={setValue}
        postfix={<Icon name="add" />}
        onClickRightIcon={() => alert(value)}
      />
    );
  },
};
