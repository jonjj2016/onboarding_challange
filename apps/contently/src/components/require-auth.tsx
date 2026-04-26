import { Navigate, Outlet } from 'react-router-dom';

import { Loading } from '@contently/toolkit';
import { useAuth } from 'contexts/auth-context';

export default function RequireAuth() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading isCentered />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
