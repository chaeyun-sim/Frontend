import JoinProcess from '@/components/JoinProcess';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/JoinProcess',
  component: JoinProcess,
  tags: ['autodocs'],
} satisfies Meta<typeof JoinProcess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  args: {
    processSteps: [
      {
        title: '약관 동의',
        iconName: 'agree',
      },
      {
        title: '사용자 정보',
        iconName: 'profile',
      },
      {
        title: '가입 완료',
        iconName: 'celebrate',
      },
    ],
    currentStep: 0,
  },
};

export const Step2: Story = {
  args: {
    processSteps: [
      {
        title: '약관 동의',
        iconName: 'agree',
      },
      {
        title: '사용자 정보',
        iconName: 'profile',
      },
      {
        title: '가입 완료',
        iconName: 'celebrate',
      },
    ],
    currentStep: 1,
  },
};

export const Step3: Story = {
  args: {
    processSteps: [
      {
        title: '약관 동의',
        iconName: 'agree',
      },
      {
        title: '사용자 정보',
        iconName: 'profile',
      },
      {
        title: '가입 완료',
        iconName: 'celebrate',
      },
    ],
    currentStep: 2,
  },
};
