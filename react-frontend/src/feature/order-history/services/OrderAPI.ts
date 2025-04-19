import { apiClient } from "../../../service/apiClient";
import { Order } from "../../../types/Order";


async function getOrders(userId: number) {
    const response = await apiClient.get<Order[]>(`/orders/user/${userId}`);
    return response.data;
}

async function getOrderDetails(id: string) {
    const response = await apiClient.get<Order>(`/orders/${id}`);
    return response.data;
}

export default { getOrders, getOrderDetails };
