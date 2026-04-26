import { lazy } from 'react';

export const routes = {
  login: '/login',
  content: '/content',
  contentEdit: '/content/edit/:id',
  contentNew: '/content/new',
};

export const LoginPage = lazy(() => import('pages/login'));
export const ContentListPage = lazy(() => import('pages/content/list'));
export const ContentEditPage = lazy(() => import('pages/content/edit'));
export const ContentNewPage = lazy(() => import('pages/content/new'));
