import Tags from '../components/common/Tags/Tags';
import type { Meta, StoryObj } from '@storybook/react';
import TagInput from '@/components/common/Tags/TagInput';
import { useRef } from 'react';

const meta = {
  title: 'Common/Tags',
  component: Tags,
  tags: ['autodocs'],
} satisfies Meta<typeof Tags>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'tag',
    isEditing: false,
  },
};

export const Editing: Story = {
  args: {
    text: 'tag',
    isEditing: true,
  },
  render: (args) => {
    const ref = useRef(null);
    return <Tags {...args} ref={ref} />;
  },
};

export const TagWithInput: Story = {
  args: {
    isEditing: false,
  },
  render: (args) => <TagInput {...args} />,
};
