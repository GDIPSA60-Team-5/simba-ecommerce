import { Product } from "./Product";
import { User } from "./User";

export interface Order {
  id: number;
  user: User;
  status: string;
  dateTime: string;
  shippingAddress: string;
  goodsServiceTax: number;
  totalAmount: number;
  orderItems: Product[];
}
