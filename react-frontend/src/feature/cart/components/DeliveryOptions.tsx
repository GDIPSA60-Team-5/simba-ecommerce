// components/DeliveryOptions.tsx
import React, { JSX, useEffect, useRef } from 'react';
import { ValidationErrors } from '../../../types/ValidationErrors';
import { useCartContext } from '../../../context/CartContext';

interface DeliveryOptionsProps {
    validationErrors?: ValidationErrors | null;
}

export function DeliveryOptions({ validationErrors }: DeliveryOptionsProps): JSX.Element {
    const {
        deliveryTypes,
        selectedDeliveryType,
        setSelectedDeliveryType,
        setDeliveryFee
    } = useCartContext();
    const shippingAddressRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const savedShippingAddress = sessionStorage.getItem("shippingAddress");
        if (savedShippingAddress && shippingAddressRef.current) {
            shippingAddressRef.current.value = savedShippingAddress;
        }
    }, []);

    const handleDeliveryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedId = parseInt(e.target.value);
        const selected = deliveryTypes.find(type => type.id === selectedId) || null;
        setSelectedDeliveryType(selected);
        setDeliveryFee(selected ? selected.fee : 0);
        sessionStorage.setItem("deliveryType", JSON.stringify(selected));
    };

    const handleShippingAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        sessionStorage.setItem("shippingAddress", e.target.value);
    };

    return (
        <>
            <div className="w-full mt-8 mb-10">
                <label
                    htmlFor="deliveryType"
                    className="block text-sm text-gray-600 font-normal mb-2 tracking-wide uppercase"
                >
                    Delivery Type
                </label>
                <select
                    id="deliveryType"
                    name="deliveryType"
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-sm shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition ease-in-out"
                    value={selectedDeliveryType ? selectedDeliveryType.id : ""}
                    onChange={handleDeliveryTypeChange}
                >
                    <option value="0" className="text-gray-400">
                        -- Please select a delivery type --
                    </option>
                    {Array.isArray(deliveryTypes) &&
                        deliveryTypes.map((type) => (
                            <option
                                key={type.id}
                                value={type.id}
                                className="text-gray-700 bg-white"
                            >
                                {`${type.name} (SGD ${type.fee.toFixed(2)}) -- ${type.description} --`}
                            </option>
                        ))}
                </select>
                {validationErrors?.deliveryTypeId && (
                    <div className="text-red-600 mt-2 text-sm">
                        {validationErrors.deliveryTypeId}
                    </div>
                )}
            </div>

            <div className="w-full mt-8 mb-4">
                <label
                    htmlFor="shippingAddress"
                    className="block text-sm text-gray-600 font-normal mb-2 tracking-wide uppercase"
                >
                    Shipping Address
                </label>
                <textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    rows={4}
                    placeholder="Enter your shipping address"
                    ref={shippingAddressRef}
                    required
                    className="w-full p-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition ease-in-out resize-none"
                    onChange={handleShippingAddressChange}
                ></textarea>
                {validationErrors?.shippingAddress && (
                    <div className="text-red-600 mt-2 text-sm">
                        {validationErrors.shippingAddress}
                    </div>
                )}
            </div>
        </>
    );
}