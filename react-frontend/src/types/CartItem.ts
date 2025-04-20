import { User } from "./User";
import { Product } from "./Product";

export type CartItem = {
    id: number;
    user: User;
    product: Product;
    quantity: number;
};
