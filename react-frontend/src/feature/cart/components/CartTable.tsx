import { CartItem } from '../../../types/CartItem';
import { CartItemRow } from ".";
import { JSX } from 'react';

interface CartTableProps {
    cart: CartItem[];
    updateCartQtyState: (cartItemId: number, quantity: number) => void;
    refreshCart: () => void;
}

export function CartTable({ cart, updateCartQtyState, refreshCart }: CartTableProps): JSX.Element {
    if (cart.length === 0) {
        return (
            <div className="text-center">
                <img
                    src="/images/empty-cart.png"
                    alt="Empty Cart"
                    className="mx-auto w-80 h-80 mb-4"
                />
                <h1 className="text-3xl font-bold text-gray-600">Your Cart is <span className="text-3xl font-bold text-red-600">Empty!</span></h1>
                <p className="my-7 font-normal text-gray-600">Must add items to the cart before you proceed to checkout.</p>
            </div>
        );
    }

    return (
        <table className="w-full mr-7 border-collapse">
            <thead>
                <tr className="text-sm text-gray-600 text-center pb-4">
                    <th className="w-1/5 pb-4 font-normal">BOOK</th>
                    <th className="w-1/5 pb-4 font-normal">PRICE (SGD)</th>
                    <th className="w-1/5 pb-4 font-normal">QUANTITY</th>
                    <th className="w-1/5 pb-4 font-normal">TOTAL (SGD)</th>
                    <th className="w-1/5 pb-4 font-normal">REMOVE</th>
                </tr>
            </thead>
            <tbody>
                {cart.map((cartItem) => (
                    <CartItemRow
                        myCartItem={cartItem}
                        refreshCart={refreshCart}
                        key={cartItem.id}
                        updateCartQtyState={updateCartQtyState}
                    />
                ))}
            </tbody>
        </table>
    );
}
