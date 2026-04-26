import type { Meta, StoryObj } from '@storybook/react';
import { FormInput } from './form-input';

const meta: Meta<typeof FormInput> = {
  title: 'Components/FormInput',
  component: FormInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: {
    label: 'Article title',
    helperText: 'Used as the page heading',
  },
};

export const WithError: Story = {
  args: {
    label: 'Article title',
    error: 'Title is required',
    value: '',
  },
};
