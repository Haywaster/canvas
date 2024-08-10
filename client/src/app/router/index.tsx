import { Main as MainPage } from 'pages/Main';
import { Paint as PaintPage } from 'pages/Paint';
import type { RouteObject } from 'react-router-dom';

enum RouterPath {
  Main = '/',
  Paint = '/session/:id'
}

export const AppRouter: RouteObject[] = [
  {
    path: RouterPath.Main,
    element: <MainPage />
  },
  {
    path: RouterPath.Paint,
    element: <PaintPage />
  }
];
