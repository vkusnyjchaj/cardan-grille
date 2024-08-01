import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './main.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home';
import Print from './views/Print/Print';
import Error from './views/Error/Error';
import NotFound from './views/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />,
    errorElement: <Error />,
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: '/print',
    element: <Print />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
