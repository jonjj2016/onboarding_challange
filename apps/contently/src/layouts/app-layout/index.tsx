import { Outlet } from 'react-router-dom';

import { Alert, Box, Snackbar } from '@contently/toolkit';
import { Nav } from 'components/nav';
import { useSnackbarStore } from 'stores/use-snackbar-store';

const AppLayout = () => {
  const isOpen = useSnackbarStore((s) => s.isOpen);
  const message = useSnackbarStore((s) => s.message);
  const severity = useSnackbarStore((s) => s.severity);
  const hide = useSnackbarStore((s) => s.hide);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Nav />
      <Box component="main" flexGrow={1} p={3}>
        <Outlet />
      </Box>
      <Snackbar
        open={isOpen}
        autoHideDuration={4000}
        onClose={hide}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={hide} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default AppLayout;
