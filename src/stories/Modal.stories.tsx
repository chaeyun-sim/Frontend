import { useState } from 'react';

import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import Modal from '@/components/common/Modal';

import { css } from '../../styled-system/css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Common/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => null,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        {isOpen && (
          <Modal
            onClose={() => setIsOpen(false)}
            className={css({ width: 380, height: 240 })}
          >
            <div>test</div>
          </Modal>
        )}
        <Button text="버튼" onClick={() => setIsOpen(true)} />
      </>
    );
  },
};

export const Login: Story = {
  args: {
    onClose: () => null,
  },
  render: () => <Header />,
};
