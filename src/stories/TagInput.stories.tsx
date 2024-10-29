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
    tagList: ['해외 여행', '국내 여행'],
    setTagList: () => null,
  },
  render: (args) => <TagInput {...args} />,
};
