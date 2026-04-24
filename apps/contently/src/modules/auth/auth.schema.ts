import * as yup from 'yup';
import type { LoginFormValues } from './auth.types';

export const loginSchema: yup.ObjectSchema<LoginFormValues> = yup.object({
  email: yup
    .string()
    .email('Enter a valid email address')
    .required('Email is required'),
});
