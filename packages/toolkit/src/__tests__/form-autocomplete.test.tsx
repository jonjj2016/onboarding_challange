import { render, screen } from '@testing-library/react';
import { FormAutocomplete } from '../components/form-autocomplete/form-autocomplete';

interface Item {
  id: string;
  name: string;
}

const loadOptions = async (): Promise<Item[]> => [
  { id: '1', name: 'Option A' },
  { id: '2', name: 'Option B' },
];

describe('FormAutocomplete', () => {
  it('renders the label', () => {
    render(
      <FormAutocomplete<Item>
        label="Products"
        value={[]}
        onChange={() => {}}
        loadOptions={loadOptions}
        getOptionLabel={(o) => o.name}
        getOptionKey={(o) => o.id}
      />,
    );
    expect(screen.getByLabelText('Products')).toBeInTheDocument();
  });

  it('displays selected item chip', () => {
    render(
      <FormAutocomplete<Item>
        label="Products"
        value={[{ id: '1', name: 'Option A' }]}
        onChange={() => {}}
        loadOptions={loadOptions}
        getOptionLabel={(o) => o.name}
        getOptionKey={(o) => o.id}
      />,
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });
});
