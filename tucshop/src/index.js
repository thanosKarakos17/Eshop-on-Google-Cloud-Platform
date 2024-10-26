import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThemeProvider from './context/theme.context';
import CartProvider from './context/cart.context';
import SearchProductProvider from './context/search.context';
import './config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <CartProvider>
        <SearchProductProvider>
          <App/>
        </SearchProductProvider>
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);