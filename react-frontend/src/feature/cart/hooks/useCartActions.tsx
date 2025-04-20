import { useState } from 'react';
import { CartItem } from '../../../types/CartItem';
import CartApi from '../service/CartApi';

interface CartQuantities {
    [cartItemId: number]: number;
}

export function useCartActions(cart: CartItem[]) {
    const [updatedQuantities, setUpdatedQuantities] = useState<CartQuantities>({});
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [cartChanged, setCartChanged] = useState<boolean>(false);

    const updateCartQtyState = (cartItemId: number, quantity: number): void => {
        setUpdatedQuantities(prev => ({ ...prev, [cartItemId]: quantity }));
        setCartChanged(true);
    };

    const saveCart = async (): Promise<boolean> => {
        setIsSaving(true);

        try {
            for (const cartItem of cart) {
                const updatedItem = {
                    ...cartItem,
                    quantity: updatedQuantities[cartItem.id] ?? cartItem.quantity,
                };

                await CartApi.updateQuantity(updatedItem);
            }

            setCartChanged(false);
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message || "Failed to update quantity");
                console.error("Update quantity error:", err);
            } else {
                alert("An unknown error occurred");
                console.error("Unknown error:", err);
            }
            return false;
        } finally {
            setIsSaving(false);
        }
    };


    const deleteCart = async (): Promise<boolean> => {
        try {
            await CartApi.deleteAll();
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert(err.message || "Failed to delete cart");
            } else {
                alert("Failed to delete cart");
            }
            console.error("Remove error:", err);
            return false;
        }
    };


    return {
        updatedQuantities,
        isSaving,
        cartChanged,
        updateCartQtyState,
        saveCart,
        deleteCart,
    };
}
