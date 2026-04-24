import styled from '@emotion/styled';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color'> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantMap: Record<ButtonVariant, Pick<MuiButtonProps, 'variant' | 'color'>> = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'primary' },
  danger: { variant: 'contained', color: 'error' },
};

const StyledButton = styled(MuiButton)`
  min-width: 100px;
  position: relative;
`;

export function Button({
  variant = 'primary',
  isLoading = false,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  const { variant: muiVariant, color } = variantMap[variant];

  return (
    <StyledButton
      {...rest}
      variant={muiVariant}
      color={color}
      disabled={disabled || isLoading}
      startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : rest.startIcon}
    >
      {children}
    </StyledButton>
  );
}
