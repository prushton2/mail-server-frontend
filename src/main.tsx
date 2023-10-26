import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home.tsx'
import Mail from './components/Mail.tsx'
import Login from './components/Login.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

const router = createBrowserRouter(
  [
    {path: "/", element: <Home />},
    {path: "/mail", element: <Mail />},
    {path: "/login", element: <Login />}
  ],
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
