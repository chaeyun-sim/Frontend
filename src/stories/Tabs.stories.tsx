import Tabs from '@/components/common/Tabs';
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
    tabList: ['이용 약관', '개인 정보 수집 및 저장', '회원 탈퇴 시 처리 방안'],
  },
};
