import { OrderItem } from "./OrderItem";
import { User } from "./User";

export interface Order {
  id: number;
  user: User;
  status: string;
  dateTime: string;
  shippingAddress: string;
  goodsServiceTax: number;
  totalAmount: number;
  orderItems: OrderItem[];
}
