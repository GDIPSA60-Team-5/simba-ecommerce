import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CartPage({ cartId }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshCart = () => {
    axios.get(`http://localhost:8080/api/cart/${cartId}`)
      .then(res => {
        console.log("🛒 Cart data received:", res.data);
        setCart(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to refresh cart", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshCart();
  }, [cartId]);

  const getTotalPrice = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const handleReduce = (productId) => {
    axios.put(`http://localhost:8080/api/cart/${cartId}/reduce/${productId}`)
      .then(() => {
        refreshCart();
      })
      .catch(err => {
        alert(err.response?.data?.message || "Failed to reduce quantity");
        console.error("Reduce error:", err);
      });
  };
  
  const handleRemove = (productId) => {
    axios.delete(`http://localhost:8080/api/cart/${cartId}/remove/${productId}`)
      .then(() => {
        alert("Product removed");
        refreshCart();
      })
      .catch(err => {
        alert(err.response?.data?.message ||"Failed to remove product");
        console.error("Remove error:", err);
      });
  };

  const handleIncrease = (productId) => {
    axios.post(`http://localhost:8080/api/cart/${cartId}/add`, null, {
      params: {
        productId: productId,
        quantity: 1
      }
    })
    .then(() => {
      refreshCart(); // re-fetch updated cart
    })
    .catch(err => {
      alert(err.response?.data?.message || "Failed to increase quantity");
      console.error("Increase error:", err);
    });
  };



  return (
    <div>
      <h2>Your Cart</h2>

      {loading ? (
        <p>Loading cart...</p>
      ) : !cart || !cart.items || cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.items.map((item) => (
              <li key={item.id}>
                <strong>{item.product.name}</strong> — Qty: {item.quantity} — ${item.product.price}

                <button onClick={() => handleReduce(item.product.id)} style={{ marginLeft: '10px' }}> – </button>
                <button onClick={() => handleIncrease(item.product.id)} disabled={item.quantity >=item.product.quantity} 
                title={item.quantity >= item.product.quantity ? "Max stock reached" : "Add one more to the cart"}
                style={{ marginLeft: '10px', opacity:item.quantity >= item.product.quantity ? 0.5:1, curson: item.quantity >= item.product.quantity ? 'not-allowed' : 'pointer'}}>+</button>

                <button onClick={() => handleRemove(item.product.id)} style={{ marginLeft: '10px' }}> Remove </button>
              </li>
            ))}
          </ul>

          <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}