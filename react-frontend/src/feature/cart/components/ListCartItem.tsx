// components/ListCartItem.tsx
import React, { useEffect, JSX } from 'react';
import { useCartContext } from '../../../context/CartContext';
import { useCartCheckout } from '../hooks/useCartCheckout';
import { CartHeader, CartTable, CartSummary, CartActions } from '.';
import { DeliveryOptions } from './DeliveryOptions';

export default function ListCartItem(): JSX.Element {
    const {
        cartLoading: loading,
        cartError: error,
        selectedDeliveryType,
        setSelectedDeliveryType,
        setDeliveryFee,
        saveCart,
        cartChanged
    } = useCartContext();

    const { submitOrder, validationErrors } = useCartCheckout(saveCart, cartChanged);

    useEffect(() => {
        const savedDeliveryType = sessionStorage.getItem("deliveryType");
        if (savedDeliveryType) {
            try {
                const parsed = JSON.parse(savedDeliveryType);
                if (parsed) {
                    setSelectedDeliveryType(parsed);
                    setDeliveryFee(parsed.fee);
                }
            } catch (err) {
                console.error("Failed to parse savedDeliveryType", err);
            }
        }
    }, [setSelectedDeliveryType, setDeliveryFee]);

    const handleSubmitOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const shippingAddressElement = document.getElementById('shippingAddress') as HTMLTextAreaElement;
        const shippingAddress = shippingAddressElement?.value;

        const orderDetails = {
            deliveryTypeId: selectedDeliveryType?.id ?? null,
            shippingAddress: shippingAddress,
        };

        submitOrder(orderDetails);
    };

    if (loading) {
        return <div className="text-center py-10">Loading your cart...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-600">Error loading your cart: {error}</div>;
    }

    return (
        <form className="max-w-[75%] mx-auto p-8">
            <CartHeader />

            <div className="flex justify-between gap-8 mb-8">
                <div className="w-[70%]">
                    <CartTable />
                    <CartActions />
                </div>

                <div className="w-[30%] min-w-[220px] border-t-18 border-black ml-5 mt-2 pt-4">
                    <CartSummary />

                    {validationErrors?.cart && (
                        <div style={{ color: "red", marginBottom: "1rem" }}>
                            {validationErrors.cart}
                        </div>
                    )}

                    <DeliveryOptions validationErrors={validationErrors} />

                    <div>
                        <button
                            type="button"
                            onClick={handleSubmitOrder}
                            className="px-4 py-3 bg-black text-white font-semibold cursor-pointer transition-all duration-200 hover:contrast-[115%] active:brightness-90 active:scale-[0.98] block mt-4"
                        >
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}