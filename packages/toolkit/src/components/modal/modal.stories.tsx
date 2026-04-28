import { useState } from 'react';
import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

import { Modal } from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalWithTrigger = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setIsOpen(true)}>
        Open modal
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={title}>
        {children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => (
    <ModalWithTrigger title="Unsaved changes">
      You have unsaved changes. Are you sure you want to leave?
    </ModalWithTrigger>
  ),
};

export const LongContent: Story = {
  render: () => (
    <ModalWithTrigger title="Terms & Conditions">
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </ModalWithTrigger>
  ),
};
