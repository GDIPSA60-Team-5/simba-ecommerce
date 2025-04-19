import { CartItemType, DeliveryType } from "../types/types";
import { CartContextType } from "../types/CartContext";
import React, { createContext, useState } from 'react';
import axios, { AxiosResponse } from "axios";


// create context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component to provide state
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [myCart, updateMyCart] = useState<CartItemType[]>([]);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [updatedQuantities, setUpdatedQuantities] = useState<{ [cartItemId: number]: number }>({});
    const [deliType, updateDeliType] = useState<DeliveryType[]>([]);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | null>(null);

    function retrieveCart() {
        axios
            .get("http://localhost:8080/api/cart", {
                withCredentials: true
            })
            .then((response: AxiosResponse) => {
                console.log("server response:", response.data);
                updateMyCart(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    function retrieveDeliType() {
        axios
            .get("http://localhost:8080/api/deli-type")
            .then((response: AxiosResponse) => {
                console.log("delivery type response", response.data);
                updateDeliType(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <CartContext.Provider value={{ myCart, updateMyCart, deliveryFee, setDeliveryFee, updatedQuantities, setUpdatedQuantities, retrieveCart, deliType, updateDeliType, retrieveDeliType,
            selectedDeliveryType, setSelectedDeliveryType,
        }}>
            {children}
        </CartContext.Provider>
    );
};