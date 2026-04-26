import type { Meta, StoryObj } from '@storybook/react';
import { FormSelect } from './form-select';

const meta: Meta<typeof FormSelect> = {
  title: 'Components/FormSelect',
  component: FormSelect,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormSelect>;

const staticOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
];

export const StaticOptions: Story = {
  args: {
    label: 'Status',
    value: 'draft',
    options: staticOptions,
    onChange: () => {},
  },
};

export const AsyncOptions: Story = {
  args: {
    label: 'Author',
    value: '',
    options: () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              { value: '1', label: 'Alice Chen' },
              { value: '2', label: 'Bob Martinez' },
            ]),
          800,
        ),
      ),
    onChange: () => {},
  },
};
