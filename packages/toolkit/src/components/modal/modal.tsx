import styled from '@emotion/styled';
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export function Modal({ isOpen, onClose, title, children, maxWidth = 'sm' }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      // MUI Dialog handles portal, focus trap and ESC key natively
    >
      {title && (
        <StyledDialogTitle>
          {title}
          <IconButton onClick={onClose} size="small" aria-label="close">
            <CloseIcon fontSize="small" />
          </IconButton>
        </StyledDialogTitle>
      )}
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
