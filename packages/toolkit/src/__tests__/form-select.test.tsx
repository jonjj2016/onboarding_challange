import { render, screen } from '@testing-library/react';

import { FormSelect } from '../components/form-select/form-select';

const options = [
  { value: '1', label: 'Draft' },
  { value: '3', label: 'Published' },
];

describe('FormSelect', () => {
  it('renders the label', () => {
    render(<FormSelect label="Status" value="1" options={options} onChange={() => {}} />);
    // MUI renders the label in multiple elements (InputLabel + legend)
    expect(screen.getAllByText('Status').length).toBeGreaterThan(0);
  });

  it('displays error message', () => {
    render(
      <FormSelect label="Status" value="" options={options} onChange={() => {}} error="Required" />,
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});
