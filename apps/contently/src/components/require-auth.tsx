import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'contexts/auth-context';
import { CircularProgress, Box } from '@mui/material';

export default function RequireAuth() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
