import React from "react";
import { useState } from 'react'
import axios from "axios"
import { FaTrash } from "react-icons/fa";
import { CartItem } from "../../../types/CartItem";


// Written by Aung Myin Moe & Haziq
interface CartItemProps {
  myCartItem: CartItem;
  refreshCart: () => void;
  updateCartQtyState: (cartItemId: number, quantity: number) => void;
}

export const CartItemRow = ({ myCartItem, refreshCart, updateCartQtyState }: CartItemProps) => {
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
    axios.delete(`/api/cart/remove/${myCartItem.product.id}`, {
      withCredentials: true
    })
      .then(() => {
        refreshCart();
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
