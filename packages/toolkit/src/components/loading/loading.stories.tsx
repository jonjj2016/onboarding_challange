import type { Meta, StoryObj } from '@storybook/react';

import { Loading } from './loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Loading size="small" />
      <Loading size="medium" />
      <Loading size="large" />
    </div>
  ),
};

export const Centered: Story = {
  args: {
    isCentered: true,
    size: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ height: 200, border: '1px dashed #ccc' }}>
        <Story />
      </div>
    ),
  ],
};
