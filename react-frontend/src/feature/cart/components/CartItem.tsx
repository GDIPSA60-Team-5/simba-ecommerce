import React from "react";
import { CartItemType } from "../../../types/types";

interface CartItemProps {
    myCartItem: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ myCartItem }) => {
  return (
    <tr>
    <td>{myCartItem.product.name}</td>
      <td>
        <button type="button">−</button>
        <input type="number" value={myCartItem.quantity} min={1} style={{ width: '50px', textAlign: 'center' }} />
        <button type="button">+</button>
      </td>
    </tr>
  );
};

export default CartItem;