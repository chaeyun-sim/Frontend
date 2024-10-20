import Button from '../components/common/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

const meta = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ContainedLarge: Story = {
  args: {
    text: 'button',
    variant: 'contained',
    size: 'large',
  },
};

export const OutlinedLarge: Story = {
  args: {
    text: 'button',
    variant: 'outlined',
    size: 'large',
  },
};

export const DisabledLarge: Story = {
  args: {
    text: 'button',
    size: 'large',
    disabled: true,
  },
};

export const ContainedSmall: Story = {
  args: {
    text: 'button',
    variant: 'contained',
    size: 'small',
  },
};

export const OutlinedSmall: Story = {
  args: {
    text: 'button',
    variant: 'outlined',
    size: 'small',
  },
};
