// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import ProductPage from './pages/cart/ProductPage';
import CartPage from './pages/cart/CartPage';

function App() {
  const cartId = 1;

  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>My Shopping App</h1>

        <nav style={{ marginBottom: '20px' }}>
          <Link to="/products" style={{ marginRight: '10px' }}>Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<ProductPage cartId={cartId} />} />
          <Route path="/cart" element={<CartPage cartId={cartId} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
