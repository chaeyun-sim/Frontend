import ProfileImage from '@/components/common/ProfileImage';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/ProfileImage',
  component: ProfileImage,
  tags: ['autodocs'],
} satisfies Meta<typeof ProfileImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
