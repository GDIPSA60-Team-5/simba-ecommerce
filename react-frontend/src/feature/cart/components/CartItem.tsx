import React from "react";
import { CartItemType } from "../../../types/types"
import { useState } from 'react'
import axios from "axios";


// Written by Aung Myin Moe & Haziq
interface CartItemProps {
    myCartItem: CartItemType;
    onQuantityChange: (id: number, newQuantity: number) => void;
    onDelete: (productId: number) => void;
    // retrieveCart: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ myCartItem, onQuantityChange, onDelete }) => {
  const productStock = myCartItem.product.quantity;

  function handleReduce() {
    if (myCartItem.quantity > 1) {
      onQuantityChange(myCartItem.id, myCartItem.quantity - 1);
    } else {
      alert("Minimum quantity is 1");
    }
  }

  function handleIncrease() {
    if (myCartItem.quantity < productStock) {
      onQuantityChange(myCartItem.id, myCartItem.quantity + 1);
    } else {
      alert("Maximum quantity is reached");
    }
  }

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const inputQty = parseInt(e.target.value);
    if (!isNaN(inputQty) && inputQty >= 1 && inputQty <= productStock) {
      onQuantityChange(myCartItem.id,inputQty);
    } else if (inputQty > productStock) {
      alert("Not enough product stock");
    }
  }

  function handleDeleteProduct() {
    onDelete(myCartItem.product.id);
  }

  // function productTotal() {
  //   return (myCartItem.product.price * myCartItem.quantity).toFixed(2);
  // }

  // function handleUpdateQty() {
  //   const updatedCartItem: CartItemType = {
  //     ...myCartItem,
  //     quantity: currentQty
  //   };
  //   axios.put(
  //     `http://localhost:8080/api/cart/update-quantity`,
  //     updatedCartItem,
  //     { withCredentials: true }
  //   )
  //   .then(() => {
  //     retrieveCart();
  //   })
  //   .catch(err => {
  //     alert(err.response?.data?.message || "Failed to update quantity");
  //     console.error("Update quantity error:", err);
  //   });
  // }

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
          value={myCartItem.quantity}
          min={1}
          max={myCartItem.product.quantity}
          style={{ width: '30px', textAlign: 'center', padding: "1rem 0" }}
        />
        <button type="button" onClick={handleIncrease} style={{ padding: "0.25rem 0.5rem" }}>+</button>
      </div>
    </td>
    <td style={{ padding: "0 2rem", textAlign: "right" }}> {(myCartItem.product.price * myCartItem.quantity).toFixed(2)}</td>
    <td style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}>
  {/* <button
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
  </button> */}
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