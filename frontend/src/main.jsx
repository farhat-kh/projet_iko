import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router';
import './styles/global.css';
// CONTEXT
import { AuthProvider } from './utils/context/AuthContext';
import { CartProvider } from './utils/context/CartContext.jsx';
import { HelmetProvider } from 'react-helmet-async';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';



const initialOptions = {
  'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: 'EUR',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <PayPalScriptProvider options={initialOptions}>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </PayPalScriptProvider>
    </HelmetProvider>
  </React.StrictMode>
);
