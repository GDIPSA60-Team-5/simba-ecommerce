import { useEffect, useState } from "react";
import OrderAPI from "../services/OrderAPI";
import { Order } from "../../../types/Order";

export const useUserOrders = (userId: number | undefined) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        setError(null);

        OrderAPI.getOrders(userId)
            .then((response) => setOrders(response))
            .catch(() => setError("Failed to fetch orders"))
            .finally(() => setLoading(false));
    }, [userId]);

    return { orders, loading, error };
};
