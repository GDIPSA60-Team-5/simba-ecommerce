import { apiClient } from "../../../service/apiClient";

const CartApi = {
    async getDeliveryTypes() {
        const response = await apiClient.get("/delivery-types");
        return response.data;
    },

};

export default CartApi;
