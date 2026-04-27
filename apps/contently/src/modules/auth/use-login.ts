import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from 'contexts/auth-context';
import { loginSchema } from './auth.schema';
import type { LoginFormValues } from './auth.types';

export interface UseLoginReturn {
  form: ReturnType<typeof useForm<LoginFormValues>>;
  serverError: string | null;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const useLogin = (): UseLoginReturn => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setServerError(null);
    try {
      await login(values.email);
      navigate('/content', { replace: true });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login failed');
    }
  });

  return {
    form,
    serverError,
    isSubmitting: form.formState.isSubmitting,
    onSubmit,
  };
};
