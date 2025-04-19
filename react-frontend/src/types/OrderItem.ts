import { Order } from "./Order";
import { Product } from "./Product";

export interface OrderItem {
    id: number;
    order: Order; 
    product: Product; 
    quantity: number;
    unitPriceAtTransaction: number;
  }