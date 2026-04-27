import type { ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

import { theme } from 'lib/theme';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
