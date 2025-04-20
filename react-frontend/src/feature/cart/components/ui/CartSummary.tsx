import { JSX } from "react";

// components/CartSummary.tsx
interface CartSummaryProps {
    total: number;
    tax: number;
    deliveryFee: number;
}

export function CartSummary({ total, tax, deliveryFee }: CartSummaryProps): JSX.Element {
    const grandTotal = total + tax + deliveryFee;

    return (
        <table className="w-full border-collapse text-sm">
            <tbody>
                <tr>
                    <td className="w-2/4 text-left pt-4 pb-2 font-normal">CART TOTAL</td>
                    <td className="w-2/4 text-right pt-4 pb-2 font-normal">{total.toFixed(2)}</td>
                    <td className="w-1/4"></td>
                </tr>
                <tr>
                    <td className="text-left py-2 font-normal">GST (9%)</td>
                    <td className="text-right py-2 font-normal">{tax.toFixed(2)}</td>
                    <td></td>
                </tr>
                <tr>
                    <td className="text-left pt-2 pb-4 font-normal">DELIVERY FEE</td>
                    <td className="text-right pt-2 pb-4 font-normal">{deliveryFee.toFixed(2)}</td>
                    <td></td>
                </tr>
                <tr>
                    <td className="border-t border-gray-400 text-left py-4 font-bold text-gray-800">TOTAL</td>
                    <td className="border-t border-gray-400 text-right py-4 font-bold text-gray-800">
                        SGD {grandTotal.toFixed(2)}
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
}