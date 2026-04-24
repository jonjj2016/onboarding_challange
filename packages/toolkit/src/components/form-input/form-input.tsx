import { forwardRef } from 'react';
import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import type { TextFieldProps } from '@mui/material';

export interface FormInputProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  label: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
}

const CharCount = styled(Typography)`
  text-align: right;
  color: #757575;
  font-size: 0.75rem;
  margin-top: 2px;
`;

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, maxLength, value, ...rest }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div>
        <TextField
          {...rest}
          inputRef={ref}
          label={label}
          value={value}
          error={!!error}
          helperText={error ?? helperText}
          fullWidth
          inputProps={{ ...rest.inputProps, maxLength }}
        />
        {maxLength && (
          <CharCount>
            {currentLength}/{maxLength}
          </CharCount>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';
