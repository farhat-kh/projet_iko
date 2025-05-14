import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router';
import './styles/global.css';
// CONTEXT
import { AuthProvider } from './utils/context/AuthContext';
import { CartProvider } from './utils/context/CartContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
