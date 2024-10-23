import TagInput from '@/components/TagInput';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/TagInput',
  component: TagInput,
  tags: ['autodocs'],
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TagWithInput: Story = {
  args: {
    isEditing: false,
  },
  render: (args) => <TagInput {...args} />,
};
