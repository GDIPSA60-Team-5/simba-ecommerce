import { CartItem } from "./CartItem";
import { DeliveryType } from "./DeliveryType";

export type CartContextType = {
    myCart: CartItem[];
    updateMyCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    deliveryFee: number;
    setDeliveryFee: React.Dispatch<React.SetStateAction<number>>;
    updatedQuantities: { [cartItemId: number]: number };
    setUpdatedQuantities: React.Dispatch<React.SetStateAction<{ [cartItemId: number]: number }>>;
    retrieveCart: () => void;
    deliType: DeliveryType[];
    updateDeliType: React.Dispatch<React.SetStateAction<DeliveryType[]>>;
    retrieveDeliType: () => void;
    selectedDeliveryType: DeliveryType | null;
    setSelectedDeliveryType: React.Dispatch<React.SetStateAction<DeliveryType | null>>;
};