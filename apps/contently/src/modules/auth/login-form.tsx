import { Alert, Box } from '@mui/material';
import { Button, FormInput } from '@contently/toolkit';
import type { UseFormReturn } from 'react-hook-form';
import type { LoginFormValues } from './auth.types';

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  serverError: string | null;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function LoginForm({ form, serverError, isSubmitting, onSubmit }: LoginFormProps) {
  const { register, formState: { errors } } = form;

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      {serverError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {serverError}
        </Alert>
      )}

      <FormInput
        {...register('email')}
        label="Email address"
        type="email"
        autoFocus
        error={errors.email?.message}
        sx={{ mb: 3 }}
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        size="large"
        isLoading={isSubmitting}
      >
        Sign in
      </Button>
    </Box>
  );
}
