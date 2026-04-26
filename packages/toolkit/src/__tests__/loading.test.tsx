import { render, screen } from '@testing-library/react';

import { Loading } from '../components/loading/loading';

describe('Loading', () => {
  it('renders a spinner', () => {
    render(<Loading />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders centered with full viewport height when isCentered', () => {
    const { container } = render(<Loading isCentered />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.minHeight).toBe('100vh');
  });
});
