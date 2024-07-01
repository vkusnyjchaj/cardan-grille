import React from 'react'
import ReactDOM from 'react-dom/client'
import "normalize.css"
import './main.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import generate from './utils/generator'

generate(8);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
