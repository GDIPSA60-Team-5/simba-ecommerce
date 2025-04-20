import { useEffect, useState, useCallback } from "react";
import OrderAPI from "../services/OrderAPI";
import { Order } from "../../../types/Order";

export const useUserOrders = (userId: number | undefined) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(() => {
        if (!userId) return;
        setLoading(true);
        setError(null);

        OrderAPI.getOrders(userId)
            .then((response) => setOrders(response))
            .catch(() => setError("Failed to fetch orders"))
            .finally(() => setLoading(false));
    }, [userId]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, loading, error, refreshOrders: fetchOrders };
};
