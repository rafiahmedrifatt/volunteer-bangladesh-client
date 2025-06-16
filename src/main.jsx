import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { Router } from './Router/Routes.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={Router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
