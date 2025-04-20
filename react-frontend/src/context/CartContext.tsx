import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import CartApi from "../feature/cart/service/CartApi";
import DeliveryTypeApi from "../feature/cart/service/DeliveryTypeApi";
import { CartItem } from "../types/CartItem";
import { DeliveryType } from "../types/DeliveryType";

// Define comprehensive context type
interface CartContextType {
    // Cart items
    cart: CartItem[];
    updateCart: (items: CartItem[]) => void;

    // Loading states
    cartLoading: boolean;
    deliveryTypesLoading: boolean;
    isSaving: boolean;

    // Error states
    cartError: string | null;
    deliveryTypesError: string | null;

    // Cart operations
    refreshCart: () => void;
    updateCartQtyState: (cartItemId: number, quantity: number) => void;
    saveCart: () => Promise<boolean>;
    deleteCart: () => Promise<boolean>;

    // Quantity tracking
    updatedQuantities: { [cartItemId: number]: number };
    cartChanged: boolean;

    // Delivery options
    deliveryFee: number;
    setDeliveryFee: (fee: number) => void;
    deliveryTypes: DeliveryType[];
    selectedDeliveryType: DeliveryType | null;
    setSelectedDeliveryType: (type: DeliveryType | null) => void;
    refreshDeliveryTypes: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Cart state
    const [cart, updateCart] = useState<CartItem[]>([]);
    const [cartLoading, setCartLoading] = useState<boolean>(true);
    const [cartError, setCartError] = useState<string | null>(null);

    // Cart actions state
    const [updatedQuantities, setUpdatedQuantities] = useState<{ [cartItemId: number]: number }>({});
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [cartChanged, setCartChanged] = useState<boolean>(false);

    // Delivery state
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [deliveryTypes, setDeliveryTypes] = useState<DeliveryType[]>([]);
    const [deliveryTypesLoading, setDeliveryTypesLoading] = useState<boolean>(true);
    const [deliveryTypesError, setDeliveryTypesError] = useState<string | null>(null);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | null>(null);

    // Fetch cart items
    const refreshCart = useCallback(() => {
        setCartLoading(true);
        setCartError(null);

        CartApi.getCartItems()
            .then((response) => {
                updateCart(response);
            })
            .catch((err) => {
                setCartError("Failed to fetch cart items");
                console.error(err);
            })
            .finally(() => {
                setCartLoading(false);
            });
    }, []);

    // Fetch delivery types
    const refreshDeliveryTypes = useCallback(() => {
        setDeliveryTypesLoading(true);
        setDeliveryTypesError(null);

        DeliveryTypeApi.getDeliveryTypes()
            .then((response) => {
                setDeliveryTypes(response);
            })
            .catch((err) => {
                setDeliveryTypesError("Failed to fetch delivery types");
                console.error(err);
            })
            .finally(() => {
                setDeliveryTypesLoading(false);
            });
    }, []);

    const updateCartQtyState = useCallback((cartItemId: number, quantity: number): void => {
        setUpdatedQuantities(prev => ({ ...prev, [cartItemId]: quantity }));
        setCartChanged(true);
    }, []);

    const saveCart = async (): Promise<boolean> => {
        setIsSaving(true);

        try {
            for (const cartItem of cart) {
                const updatedItem = {
                    ...cartItem,
                    quantity: updatedQuantities[cartItem.id] ?? cartItem.quantity,
                };

                await CartApi.updateQuantity(updatedItem);
            }

            setCartChanged(false);
            refreshCart();
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setCartError(err.message || "Failed to update quantity");
                console.error("Update quantity error:", err);
            } else {
                setCartError("An unknown error occurred");
                console.error("Unknown error:", err);
            }
            return false;
        } finally {
            setIsSaving(false);
        }
    };

    const deleteCart = async (): Promise<boolean> => {
        try {
            await CartApi.deleteAll();
            refreshCart();
            return true;
        } catch (err: unknown) {
            if (err instanceof Error) {
                setCartError(err.message || "Failed to delete cart");
            } else {
                setCartError("Failed to delete cart");
            }
            console.error("Remove error:", err);
            return false;
        }
    };

    useEffect(() => {
        refreshCart();
        refreshDeliveryTypes();
    }, [refreshCart, refreshDeliveryTypes]);

    const contextValue: CartContextType = {
        cart,
        updateCart,
        cartLoading,
        deliveryTypesLoading,
        isSaving,
        cartError,
        deliveryTypesError,
        refreshCart,
        updateCartQtyState,
        saveCart,
        deleteCart,
        updatedQuantities,
        cartChanged,
        deliveryFee,
        setDeliveryFee,
        deliveryTypes,
        selectedDeliveryType,
        setSelectedDeliveryType,
        refreshDeliveryTypes
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the cart context
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
};