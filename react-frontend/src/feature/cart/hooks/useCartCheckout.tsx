import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import CartApi from "../service/CartApi";
import { CheckoutRequestDTO } from "../../../types/dto/CheckOutRequestDTO";
import { ValidationErrors } from "../../../types/ValidationErrors"; // if you have this type

export function

    useCartCheckout(saveCart: () => Promise<boolean>, cartChanged: boolean) {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors | null>(null);

    interface OrderResponse {
        clientSecret: string;
    }

    const submitOrder = async (orderDetails: CheckoutRequestDTO): Promise<void> => {
        try {
            if (cartChanged) {
                await saveCart();
            }

            const response: OrderResponse = await CartApi.checkout(orderDetails);
            navigate("/checkout", { state: { clientSecret: response.clientSecret } });
        } catch (error: unknown) {
            if (error instanceof Error) {
                const axiosError = error as AxiosError;

                if (
                    axiosError.response?.data &&
                    typeof axiosError.response.data === "object"
                ) {
                    setValidationErrors(axiosError.response.data as ValidationErrors);
                } else {
                    alert("Error submitting order");
                }


            } else {
                alert("Unknown error");
                console.error("Unexpected error: ", error);
            }
        }
    };

    return {
        submitOrder,
        validationErrors,
    };
}
