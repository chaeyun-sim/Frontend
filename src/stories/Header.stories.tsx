import Header from '@/components/common/Header';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
