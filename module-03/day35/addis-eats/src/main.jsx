import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import { AuthProvider } from "./auth/AuthProvider";
import ErrorBoundary from "./ErrorBoundary";
import './index.css';
import "./styles/menu.css";
import "./styles/auth.css";
import "./styles/components.css";
import "./styles/cart.css";
import "./styles/checkout.css";
import "./styles/layout.css";
import "./styles/home.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
      </AuthProvider> 
    </BrowserRouter>
  </StrictMode>
);
