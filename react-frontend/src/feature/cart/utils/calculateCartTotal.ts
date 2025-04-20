import { CartItem } from "../../../types/CartItem";
interface QuantityMap {
    [cartItemId: number]: number;
}

export function calculateCartTotal(cart: CartItem[], updatedQuantities: QuantityMap = {}): number {
    return cart.reduce((total, item) => {
        const quantity = updatedQuantities[item.id] !== undefined
            ? updatedQuantities[item.id]
            : item.quantity;

        return total + (item.product.price * quantity);
    }, 0);
}