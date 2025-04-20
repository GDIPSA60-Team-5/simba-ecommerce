// components/ListCartItem.tsx
import React, { useState, useEffect, JSX } from 'react';

import { calculateCartTotal } from '../utils/calculateCartTotal';

import { useCart } from '../hooks/useCart';
import { useDeliveryType } from '../hooks/useDeliveryType';
import { useCartActions } from '../hooks/useCartActions';
import { useCartCheckout } from '../hooks/useCartCheckout';

import { CartHeader, CartTable, CartSummary, CartActions } from '.';
import { DeliveryOptions } from './DeliveryOptions';
import { DeliveryType } from '../../../types/DeliveryType';


export default function ListCartItem(): JSX.Element {
    const { cart, loading, error, refreshCart } = useCart();
    const { deliveryTypes } = useDeliveryType();
    const {
        updatedQuantities,
        isSaving,
        cartChanged,
        updateCartQtyState,
        saveCart,
        deleteCart
    } = useCartActions(cart);

    const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | null>(null);
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const { submitOrder, validationErrors } = useCartCheckout(saveCart, cartChanged);

    const total = calculateCartTotal(cart, updatedQuantities);
    const tax = total * 0.09;

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
    }, []);

    const handleSubmitOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!selectedDeliveryType) {
            alert("Please select a delivery type before submitting.");
            return;
        }

        const shippingAddressElement = document.getElementById('shippingAddress') as HTMLTextAreaElement;
        const shippingAddress = shippingAddressElement?.value;

        const orderDetails = {
            deliveryTypeId: selectedDeliveryType.id,
            shippingAddress,
        };

        submitOrder(orderDetails);
    };

    const handleDeleteCartClick = async (): Promise<void> => {
        const success = await deleteCart();
        if (success) {
            refreshCart();
        }
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
                    <CartTable
                        cart={cart}
                        updateCartQtyState={updateCartQtyState}
                        refreshCart={refreshCart}
                    />

                    <CartActions
                        cart={cart}
                        isSaving={isSaving}
                        cartChanged={cartChanged}
                        onSave={saveCart}
                        onDelete={handleDeleteCartClick}
                    />
                </div>

                <div className="w-[30%] min-w-[220px] border-t-18 border-black ml-5 mt-2 pt-4">
                    <CartSummary
                        total={total}
                        tax={tax}
                        deliveryFee={deliveryFee}
                    />

                    {validationErrors?.cart && (
                        <div style={{ color: "red", marginBottom: "1rem" }}>
                            {validationErrors.cart}
                        </div>
                    )}

                    <DeliveryOptions
                        selectedDeliveryType={selectedDeliveryType}
                        setSelectedDeliveryType={setSelectedDeliveryType}
                        setDeliveryFee={setDeliveryFee}
                        deliveryTypes={deliveryTypes}
                        validationErrors={validationErrors}
                    />

                    <div>
                        <button
                            type="button"
                            onClick={handleSubmitOrder}
                            className="px-6 py-4 bg-black text-white border-none rounded-none hover:bg-gray-800 active:bg-gray-900 transition duration-200"
                        >
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}