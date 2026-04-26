import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import RequireAuth from 'components/require-auth';

const LoginPage = lazy(() => import('pages/login'));
const AppLayout = lazy(() => import('layouts/app-layout'));
const ContentListPage = lazy(() => import('pages/content/list'));
const ContentEditPage = lazy(() => import('pages/content/edit'));
const ContentNewPage = lazy(() => import('pages/content/new'));

function PageLoader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}

function S({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <S>
        <LoginPage />
      </S>
    ),
  },
  {
    element: (
      <S>
        <RequireAuth />
      </S>
    ),
    children: [
      {
        element: (
          <S>
            <AppLayout />
          </S>
        ),
        children: [
          {
            path: '/content',
            element: (
              <S>
                <ContentListPage />
              </S>
            ),
          },
          {
            path: '/content/edit/:id',
            element: (
              <S>
                <ContentEditPage />
              </S>
            ),
          },
          {
            path: '/content/new',
            element: (
              <S>
                <ContentNewPage />
              </S>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/content" replace />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
