import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Nav } from 'components/nav';

export default function AppLayout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Nav />
      <Box component="main" flexGrow={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
}
