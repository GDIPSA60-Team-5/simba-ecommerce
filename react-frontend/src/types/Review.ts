import { Product } from "./Product";
import { User } from "./User";

export interface Review {
  id: number;
  product: Product;
  user: User;
  comment: string;
  rating: number;
  createdAt: string;
}
