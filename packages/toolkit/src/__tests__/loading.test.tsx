import { render, screen } from '@testing-library/react';

import { Loading } from '../components/loading/loading';

describe('Loading', () => {
  it('renders a spinner', () => {
    render(<Loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders a centered wrapper when isCentered', () => {
    render(<Loading isCentered />);
    expect(screen.getByTestId('loading-centered')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
