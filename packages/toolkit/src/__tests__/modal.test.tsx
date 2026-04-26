import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal } from '../components/modal/modal';

describe('Modal', () => {
  it('renders children when open', () => {
    render(
      <Modal isOpen onClose={() => {}} title="Confirm">
        Are you sure?
      </Modal>,
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('does not show content when closed', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Confirm">
        Hidden content
      </Modal>,
    );
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    render(
      <Modal isOpen onClose={handleClose} title="Confirm">
        Content
      </Modal>,
    );
    await user.click(screen.getByLabelText('close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
