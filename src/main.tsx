import React from 'react'
import ReactDOM from 'react-dom/client'
import "normalize.css"
import './main.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './views/Home/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
