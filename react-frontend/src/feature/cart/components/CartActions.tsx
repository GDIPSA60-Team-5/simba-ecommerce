import { JSX } from 'react';
import { useCartContext } from '../../../context/CartContext';

export function CartActions(): JSX.Element | null {
    const {
        cart,
        isSaving,
        cartChanged,
        saveCart,
        deleteCart,
        refreshCart
    } = useCartContext();

    if (cart.length === 0) {
        return null;
    }

    const handleDeleteCartClick = async (): Promise<void> => {
        const success = await deleteCart();
        if (success) {
            refreshCart();
        }
    };

    return (
        <div className="flex gap-6 mt-6">
            <button
                type="button"
                onClick={saveCart}
                disabled={isSaving || !cartChanged}
                className={`px-4 py-3 text-white font-semibold transition-all duration-200 block mt-1
                    ${isSaving ? 'bg-gray-300 cursor-not-allowed' : cartChanged ? 'bg-green-600 hover:contrast-[115%] cursor-pointer active:scale-[0.98] active:brightness-90' : 'bg-gray-400 cursor-not-allowed'}`}
            >
                SAVE CART
            </button>

            <button
                onClick={handleDeleteCartClick}
                className="px-4 py-3 bg-red-600 text-white font-semibold cursor-pointer transition-all duration-200 hover:contrast-[115%] active:brightness-90 active:scale-[0.98] block mt-1"
            >
                DELETE CART
            </button>
        </div>
    );
}