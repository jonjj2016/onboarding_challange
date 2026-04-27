import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test'; // Use this for action logging

import { ProductCard } from './product-card';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  // Set a default product for all stories
  args: {
    onRemove: fn(), // This logs removal clicks in the "Actions" tab
    product: {
      id: 'b0000000-0000-0000-0000-000000000001',
      name: 'Zwilling Pro Chef\'s Knife 8"',
      price: 149.95,
      imageUrl: 'https://placehold.co/400x400?text=Knife',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};

export const Removable: Story = {
  args: {
    // onRemove is already provided by meta.args
  },
};

export const DraggingState: Story = {
  args: {
    dragOverlay: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Visual representation of the card when it is being dragged (elevated).',
      },
    },
  },
};

export const LongName: Story = {
  args: {
    product: {
      id: '2',
      name: 'Limited Edition Hand-Forged Japanese Damascus Steel Professional Grade Kitchen Knife with Ergonomic Walnut Handle',
      price: 599.0,
      imageUrl: 'https://placehold.co/400x400?text=Premium+Knife',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export const GridView: Story = {
  render: (args) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px',
        padding: '20px',
      }}
    >
      <ProductCard {...args} />
      <ProductCard
        {...args}
        product={{
          id: '3',
          name: 'Wusthof Classic Ikon',
          price: 199.99,
          imageUrl: 'https://placehold.co/400x400?text=Wusthof',
        }}
      />
      <ProductCard
        {...args}
        product={{
          id: '4',
          name: 'Global G-2 Classic',
          price: 99.0,
          imageUrl: 'https://placehold.co/400x400?text=Global',
        }}
      />
    </div>
  ),
};
