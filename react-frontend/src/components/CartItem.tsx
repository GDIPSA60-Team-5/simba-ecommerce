import React from "react";
import { CartItemType } from "../types/types";

interface CartItemProps {
    myCartItem: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ myCartItem }) => {
  return (
    <tr>
      <td>{myCartItem.product.name}</td>
      <td>
        <button>Subtract</button>
        <input type="number" value={myCartItem.quantity} readOnly />
        <button>Add</button>
      </td>
    </tr>
  );
};

export default CartItem;