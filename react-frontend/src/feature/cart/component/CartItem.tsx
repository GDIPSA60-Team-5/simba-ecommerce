import React from "react";
import { CartItemType } from "../../../types/types"
import { useState } from 'react'
import axios from "axios";


// Written by Aung Myin Moe & Haziq
interface CartItemProps {
    myCartItem: CartItemType;
    retrieveCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ myCartItem, retrieveCart }) => {
  const [currentQty, changeQty] = useState(myCartItem.quantity);

  function handleReduce() {
    if (currentQty > 1) {
      changeQty(currentQty - 1);
    } else {
      alert("Minimum quantity is 1");
    }
  }

  function handleIncrease() {
    const productStock = myCartItem.product.quantity;
    if (currentQty < productStock) {
      changeQty(currentQty + 1);
    } else {
      alert("Maximum quantity is reached");
    }
  }

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const inputQty = parseInt(e.target.value);
    const productStock = myCartItem.product.quantity;
    if (!isNaN(inputQty) && inputQty >= 1 && inputQty <= productStock) {
      changeQty(inputQty);
    } else if (inputQty > productStock) {
      alert("Not enough product stock");
    }
  }

  function handleDeleteProduct() {
    axios.delete(`http://localhost:8080/api/cart/remove/${myCartItem.product.id}`, {
      withCredentials: true
    })
      .then(() => {
        retrieveCart();
      })
      .catch(err => {
        alert(err.response?.data?.message || "Failed to remove product");
        console.error("Remove error:", err);
      });
  }

  function productTotal() {
    return (myCartItem.product.price * myCartItem.quantity).toFixed(2);
  }

  function handleUpdateQty() {
    const updatedCartItem: CartItemType = {
      ...myCartItem,
      quantity: currentQty
    };
    axios.put(
      `http://localhost:8080/api/cart/update-quantity`,
      updatedCartItem,
      { withCredentials: true }
    )
    .then(() => {
      retrieveCart();
    })
    .catch(err => {
      alert(err.response?.data?.message || "Failed to update quantity");
      console.error("Update quantity error:", err);
    });
  }

  return (
    <tr style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
    <td style={{ padding: "1rem 0" }}>{myCartItem.product.name}</td>
    <td style={{ padding: "0 2rem", textAlign: "right" }}>{myCartItem.product.price}</td>
    <td>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <button type="button" onClick={handleReduce} style={{ padding: "0.25rem 0.5rem" }}>−</button>
        <input
          type="number"
          className="cart-quantity-input"
          onChange={handleInputValue}
          value={currentQty}
          min={1}
          max={myCartItem.product.quantity}
          style={{ width: '30px', textAlign: 'center', padding: "1rem 0" }}
        />
        <button type="button" onClick={handleIncrease} style={{ padding: "0.25rem 0.5rem" }}>+</button>
      </div>
    </td>
    <td style={{ padding: "0 2rem", textAlign: "right" }}>{productTotal()}</td>
    <td style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}>
  <button
    type="button"
    onClick={handleUpdateQty}
    style={{
      padding: "0.5rem 1rem",
      backgroundColor: "#4CAF50", // green
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Update
  </button>
  <button
    type="button"
    onClick={handleDeleteProduct}
    style={{
      padding: "0.5rem 1rem",
      backgroundColor: "#f44336", // red
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    }}
  >
    Delete
  </button>
</td>
  </tr>
  );
};

export default CartItem;