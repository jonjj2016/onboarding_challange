import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from '@mui/material';
import { Button as MuiButton } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

export interface DuplicateButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size?: 'default' | 'small';
}

const StyledButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  fontWeight: 600,
  letterSpacing: '0.4px',
  textTransform: 'none',
  padding: theme.spacing(0.75, 2),
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.07),
    borderColor: theme.palette.primary.dark,
    boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: alpha(theme.palette.primary.main, 0.14),
  },
  '&.Mui-disabled': {
    borderColor: theme.palette.action.disabled,
    color: theme.palette.action.disabled,
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.75),
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.07),
    boxShadow: `0 2px 6px ${alpha(theme.palette.primary.main, 0.18)}`,
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: alpha(theme.palette.primary.main, 0.14),
  },
  '&.Mui-disabled': {
    color: theme.palette.action.disabled,
  },
}));

export const DuplicateButton = ({ onClick, disabled, size = 'default' }: DuplicateButtonProps) => {
  if (size === 'small') {
    return (
      <Tooltip title="Duplicate" placement="top" arrow>
        <span>
          <StyledIconButton
            onClick={onClick}
            disabled={disabled}
            size="small"
            aria-label="Duplicate"
          >
            <ContentCopyIcon fontSize="small" />
          </StyledIconButton>
        </span>
      </Tooltip>
    );
  }

  return (
    <StyledButton
      variant="outlined"
      startIcon={<ContentCopyIcon fontSize="small" />}
      disabled={disabled}
      onClick={onClick}
    >
      Duplicate
    </StyledButton>
  );
};
