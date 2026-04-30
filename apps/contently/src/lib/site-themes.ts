import { createTheme } from '@mui/material';

import type { Site } from 'stores/use-site-store';

const baseTypography = {
  fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'].join(
    ',',
  ),
};

export const siteThemes: Record<Site, ReturnType<typeof createTheme>> = {
  'site-us-cooking': createTheme({
    palette: {
      primary: { main: '#E65100' }, // deep orange — warmth, appetite
      secondary: { main: '#2E7D32' }, // forest green — fresh ingredients
      divider: '#E65100', // light gray — neutral, clean
    },
    typography: baseTypography,
    shape: { borderRadius: 6 },
  }),

  'site-us-fashion': createTheme({
    palette: {
      primary: { main: '#880E4F' }, // deep rose — bold, editorial
      secondary: { main: '#4A148C' }, // deep purple — luxury
      divider: '#880E4F', // light gray — neutral, clean
    },
    typography: {
      ...baseTypography,
      fontFamily: ['"Playfair Display"', 'Georgia', 'serif'].join(','),
    },
    shape: { borderRadius: 2 }, // sharp corners — high fashion
  }),

  'site-us-travel': createTheme({
    palette: {
      primary: { main: '#006064' }, // deep teal — ocean, sky
      secondary: { main: '#E65100' }, // amber — sunsets, adventure
      divider: '#006064', // light gray — neutral, clean
    },
    typography: baseTypography,
    shape: { borderRadius: 12 }, // rounded — friendly, approachable
  }),
};
