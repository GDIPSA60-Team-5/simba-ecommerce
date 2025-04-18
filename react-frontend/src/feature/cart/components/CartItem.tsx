import React from "react";
import { CartItemType } from "../../../types/types"
import { useState } from 'react'
import axios from "axios"
import { FaTrash } from "react-icons/fa";


// Written by Aung Myin Moe & Haziq
interface CartItemProps {
    myCartItem: CartItemType;
    retrieveCart: () => void;
    updateCartQtyState: (cartItemId: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ myCartItem, retrieveCart, updateCartQtyState }) => {
  const [currentQty, changeQty] = useState(myCartItem.quantity);
  function handleReduce() {
    if (currentQty > 1) {
      const newQty = currentQty - 1;
      changeQty(newQty);
      updateCartQtyState(myCartItem.id, newQty);
    } else {
      alert("Minimum quantity is 1");
    }
  }

  function handleIncrease() {
    const productStock = myCartItem.product.quantity;
    if (currentQty < productStock) {
      const newQty = currentQty + 1;
      changeQty(newQty);
      updateCartQtyState(myCartItem.id, newQty);
    } else {
      alert("Maximum quantity is reached");
    }
  }

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    const inputQty = parseInt(e.target.value);
    const productStock = myCartItem.product.quantity;
    if (!isNaN(inputQty) && inputQty >= 1 && inputQty <= productStock) {
      changeQty(inputQty);
      updateCartQtyState(myCartItem.id, inputQty);
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
    return (myCartItem.product.price * currentQty).toFixed(2);
  }

  return (
  //   <tr style={{ borderBottom: "1px solid #ccc", padding: "1rem 0" }}>
  //     <td style={{ padding: "1rem 0" }}>
  //       <img
  //         src={myCartItem.product.imageUrl}
  //         alt={myCartItem.product.name}
  //         className="card-img object-cover w-full h-[160px]" />
  //         {myCartItem.product.name}
  //       </td>
  //     <td style={{ padding: "0 2rem", textAlign: "right" }}>{myCartItem.product.price}</td>
  //     <td>
  //       <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
  //         <button type="button" onClick={handleReduce} style={{ padding: "0.25rem 0.5rem" }}>−</button>
  //         <input
  //           type="number"
  //           onChange={handleInputValue}
  //           value={currentQty}
  //           min={1}
  //           max={myCartItem.product.quantity}
  //           style={{ width: '50px', textAlign: 'center', padding: "1rem 0" }}
  //         />
  //         <button type="button" onClick={handleIncrease} style={{ padding: "0.25rem 0.5rem" }}>+</button>
  //       </div>
  //     </td>
  //     <td style={{ padding: "0 2rem", textAlign: "right" }}>{productTotal()}</td>
  //     <td style={{ display: "flex", gap: "0.5rem", paddingTop: "0.5rem" }}>
  //       <button
  //         type="button"
  //         onClick={handleDeleteProduct}
  //         style={{
  //           padding: "0.5rem 1rem",
  //           backgroundColor: "#f44336", // red
  //           color: "white",
  //           border: "none",
  //           borderRadius: "4px",
  //           cursor: "pointer"
  //         }}
  //     >
  //       Delete
  //     </button>
  //   </td>
  // </tr>

  <tr className="border-y border-gray-300 align-top">
    <td className="py-4">
      <div className="flex flex-col items-center gap-4">
        <img
          src={myCartItem.product.imageUrl}
          alt={myCartItem.product.name}
          className="w-24 h-30 object-cover rounded"
        />
        <span className="font-medium text-center break-words">{myCartItem.product.name}</span>
      </div>
    </td>

    <td className="px-6 pt-6 text-center font-medium">
      SGD {myCartItem.product.price.toFixed(2)}
    </td>

    <td className="px-6 pt-5">
      <div className="flex items-center justify-center gap-4 font-medium">
        <button
          type="button"
          onClick={handleReduce}
          className="hover:text-red-600 active:text-red-800 transition-colors text-2xl duration-200 transform hover:scale-150 active:scale-100"
        >
          −
        </button>

        <input
          type="text"
          inputMode="numeric"
          onChange={handleInputValue}
          value={currentQty}
          min={1}
          max={myCartItem.product.quantity}
          className="w-12 text-center bg-transparent focus:outline-none"
        />

        <button
          type="button"
          onClick={handleIncrease}
          className="hover:text-green-600 active:text-green-800 transition-colors text-2xl duration-200 transform hover:scale-150 active:scale-100"
        >
          +
        </button>
      </div>
    </td>

    <td className="px-6 pt-6 text-center font-medium">
      SGD {productTotal()}
    </td>

    <td className="px-6 pt-6">
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={handleDeleteProduct}
          className="text-red-400 hover:text-red-600 active:text-red-800 transition-colors duration-200 transform hover:scale-130 active:scale-100"
        >
          <FaTrash />
        </button>
      </div>
    </td>
  </tr>
  );
};

export default CartItem;