import { Link } from 'react-router-dom';

import { AppBar, Box, Button, Toolbar, Typography } from '@contently/toolkit';
import { useAuth } from 'contexts/auth-context';
import { routes } from 'data/routes';
import SiteSwitcher from './site-switcher';

const Nav = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="h6"
          fontWeight={700}
          component={Link}
          to={routes.content}
          sx={{ color: 'white', textDecoration: 'none', mr: 2 }}
        >
          Contently
        </Typography>

        <Button variant="ghost" component={Link} to={routes.content}>
          Content
        </Button>

        <Box flexGrow={1} />

        <SiteSwitcher />

        <Typography variant="body2" sx={{ ml: 2, opacity: 0.85 }}>
          {user?.name}
        </Typography>

        <Button variant="ghost" size="small" onClick={logout}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};
export default Nav;
