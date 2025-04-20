// components/DeliveryOptions.tsx
import React, { JSX, useEffect, useRef } from 'react';
import { DeliveryType } from '../../../types/DeliveryType';
import { ValidationErrors } from '../../../types/ValidationErrors';

interface DeliveryOptionsProps {
    selectedDeliveryType: DeliveryType | null;
    setSelectedDeliveryType: (type: DeliveryType | null) => void;
    setDeliveryFee: (fee: number) => void;
    deliveryTypes: DeliveryType[];
    validationErrors: ValidationErrors | null;
}

export function DeliveryOptions({
    selectedDeliveryType,
    setSelectedDeliveryType,
    setDeliveryFee,
    deliveryTypes,
    validationErrors
}: DeliveryOptionsProps): JSX.Element {
    const shippingAddressRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const savedShippingAddress = sessionStorage.getItem("shippingAddress");
        if (savedShippingAddress && shippingAddressRef.current) {
            shippingAddressRef.current.value = savedShippingAddress;
        }
    }, []);

    const handleDeliveryTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const selectedName = e.target.value;
        const selected = deliveryTypes.find(type => type.name === selectedName) || null;
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
                    value={selectedDeliveryType ? selectedDeliveryType.name : ""}
                    onChange={handleDeliveryTypeChange}
                >
                    <option value="" className="text-gray-400">
                        -- Please select a delivery type --
                    </option>
                    {Array.isArray(deliveryTypes) &&
                        deliveryTypes.map((type) => (
                            <option
                                key={type.id}
                                value={type.name}
                                className="text-gray-700 bg-white"
                            >
                                {`${type.name} (SGD ${type.fee.toFixed(2)}) -- ${type.description} --`}
                            </option>
                        ))}
                </select>
                {validationErrors?.deliveryType && (
                    <div className="text-red-600 mt-2 text-sm">
                        {validationErrors.deliveryType}
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