import { Suspense } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { apolloClient } from 'lib/apollo-client';
import { AuthProvider } from 'contexts/auth-context';
import RequireAuth from 'components/require-auth';
import { theme } from 'lib/theme';
import {
  LoginPage,
  ContentListPage,
  ContentEditPage,
  ContentNewPage,
} from 'data/routes';

function PageLoader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                {/* All routes below require authentication */}
                <Route element={<RequireAuth />}>
                  <Route path="/content" element={<ContentListPage />} />
                  <Route path="/content/edit/:id" element={<ContentEditPage />} />
                  <Route path="/content/new" element={<ContentNewPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/content" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
