import { useEffect, useState, useCallback } from "react";
import CartApi from "../service/CartApi";
import { CartItem } from "../../../types/CartItem";

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(() => {
        setLoading(true);
        setError(null);

        CartApi.getCartItems()
            .then((response) => {
                setCart(response);
            })
            .catch((err) => {
                setError("Failed to fetch cart items");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return { cart, loading, error, refreshCart: fetchCart };
}
