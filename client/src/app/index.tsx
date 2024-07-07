import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRouter } from 'app/router';

const routerArr = Object.entries(AppRouter).map(([path, Element]) => (
  { path, element: <Element/> }));
const router = createBrowserRouter(routerArr);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={ router }/>,
);
