import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormAutocomplete } from './form-autocomplete';

const meta: Meta<typeof FormAutocomplete> = {
  title: 'Components/FormAutocomplete',
  component: FormAutocomplete,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormAutocomplete>;

interface Product {
  id: string;
  name: string;
}

const products: Product[] = [
  { id: '1', name: 'KitchenAid Stand Mixer' },
  { id: '2', name: 'Lodge Cast Iron Skillet' },
  { id: '3', name: 'Le Creuset Dutch Oven' },
];

function AutocompleteDemo({ initialValue }: { initialValue: Product[] }) {
  const [value, setValue] = useState<Product[]>(initialValue);
  return (
    <FormAutocomplete<Product>
      label="Products"
      value={value}
      onChange={setValue}
      loadOptions={async (search) =>
        products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      }
      getOptionLabel={(p) => p.name}
      getOptionKey={(p) => p.id}
    />
  );
}

export const Empty: Story = {
  render: () => <AutocompleteDemo initialValue={[]} />,
};

export const WithSelectedItems: Story = {
  render: () => <AutocompleteDemo initialValue={[products[0], products[1]]} />,
};
