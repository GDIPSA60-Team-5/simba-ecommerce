import { apiClient } from "../../../service/apiClient";
import { CartItem } from "../../../types/CartItem";
import { CheckoutRequestDTO } from "../../../types/dto/CheckOutRequestDTO";

const CartApi = {
    async getCartItems() {
        const response = await apiClient.get("/cart");
        return response.data;
    },

    async updateQuantity(item: CartItem) {
        const response = await apiClient.put("/cart/update-quantity", item);
        return response.data;
    },

    async deleteCartItem(item: CartItem) {
        const response = await apiClient.put(`/cart/remove/${item.id}", item`);
        return response.data;
    },

    async deleteAll() {
        const response = await apiClient.post("/cart/delete");
        return response.data;
    },

    async checkout(checkoutRequest: CheckoutRequestDTO) {
        const response = await apiClient.post("/cart/submit", checkoutRequest);
        return response.data;
    },
};

export default CartApi;
