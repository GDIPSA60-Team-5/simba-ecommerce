// src/pages/ProductPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductPage({ cartId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/products') // Remove withCredentials first
      .then(res => {
        console.log("Fetched products:", res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (productId) => {
  axios.post(`http://localhost:8080/api/cart/${cartId}/add`, null, {
    params: {
      productId: productId,
      quantity: 1
    }
  })
  .then(() => {
    alert("Product added to cart!");
  })
  .catch(err => {
    alert(err.response?.data?.message || "Failed to add to cart.");
    console.error("Add to cart error:", err);
    
  });
};

  return (
    <div>
      <h2>Product List</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> - ${product.price}
              <button onClick={() => handleAddToCart(product.id)} style={{ marginLeft: '10px' }}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}   