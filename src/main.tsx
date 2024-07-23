import React from 'react'
import ReactDOM from 'react-dom/client'
import "normalize.css"
import './main.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { generate } from './utils/generator';
import { encode } from './utils/encoder'

const grille = generate(4);
const tables = encode('123456789abcdefghi', grille);
console.log(tables);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
