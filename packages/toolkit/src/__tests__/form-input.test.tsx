import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormInput } from '../components/form-input/form-input';

describe('FormInput', () => {
  it('renders the label', () => {
    render(<FormInput label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<FormInput label="Email" error="Email is required" />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<FormInput label="Title" onChange={handleChange} />);
    await user.type(screen.getByLabelText('Title'), 'Hello');
    expect(handleChange).toHaveBeenCalled();
  });
});
