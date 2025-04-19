import { CartItemType, DeliveryType } from "./types";


export type CartContextType = {
    myCart: CartItemType[];
    updateMyCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
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