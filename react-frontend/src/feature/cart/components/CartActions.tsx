import { JSX } from 'react';
import { Spinner } from './ui/Spinner';
import { CartItem } from '../../../types/CartItem';

interface CartActionsProps {
    cart: CartItem[];
    isSaving: boolean;
    cartChanged: boolean;
    onSave: () => Promise<boolean>;
    onDelete: () => Promise<void>;
}

export function CartActions({
    cart,
    isSaving,
    cartChanged,
    onSave,
    onDelete
}: CartActionsProps): JSX.Element | null {
    if (cart.length === 0) {
        return null;
    }

    return (
        <div className="flex gap-6 mt-6">
            <button
                type="button"
                onClick={onSave}
                disabled={isSaving || !cartChanged}
                className={`px-6 py-4 text-white transition-colors duration-300 
          ${isSaving ? 'bg-gray-300 cursor-not-allowed' : cartChanged ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
                {isSaving ? (
                    <div className="flex items-center gap-2">
                        <Spinner />
                        Saving...
                    </div>
                ) : (
                    "SAVE CART"
                )}
            </button>

            <button
                type="button"
                onClick={onDelete}
                className="py-4 px-6 bg-red-600 text-white border-none hover:bg-red-700 active:bg-red-800 transition duration-200"
            >
                DELETE CART
            </button>
        </div>
    );
}