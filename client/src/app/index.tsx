import { AppRouter } from 'app/router';
import ReactDOM from 'react-dom/client';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/index.scss';

const routerArr: RouteObject[] = Object.entries(AppRouter).map(
  ([path, Component]) => ({ path, element: <Component /> })
);
const router = createBrowserRouter(routerArr);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
