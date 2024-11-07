import { useState } from 'react';

import VisibilityOption from '@/components/VisibilityOption';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/VisibilityOption',
  component: VisibilityOption,
  tags: ['autodocs'],
} satisfies Meta<typeof VisibilityOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: true,
    onClick: () => null,
    label: '공개 설정',
  },
  render: (args) => {
    const [isClicked, setIsClicked] = useState(true);

    return (
      <div
        style={{
          width: '100%',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: 'gray.900',
        }}
      >
        <VisibilityOption
          {...args}
          value={isClicked}
          onClick={() => setIsClicked(!isClicked)}
        />
      </div>
    );
  },
};
