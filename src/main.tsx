import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './main.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home/Home';
import Print from './views/Print/Print';
import Error from './views/Error/Error';
import NotFound from './views/NotFound/NotFound';
import { SnackbarProvider } from 'notistack';

const router = createBrowserRouter(
  [
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
  ],
  {
    basename: '/cardan-grille',
  },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={1500}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>,
);
