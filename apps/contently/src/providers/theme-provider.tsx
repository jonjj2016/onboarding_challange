import type { ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { siteThemes } from 'lib/site-themes';
import { useSiteStore } from 'stores/use-site-store';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  const activeSite = useSiteStore((s) => s.activeSite);
  const theme = siteThemes[activeSite];

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
