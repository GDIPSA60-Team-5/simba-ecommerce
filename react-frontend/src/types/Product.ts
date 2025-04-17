import { Author } from "./Author";
import { Category } from "./Category";

export type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    description: string;
    category: Category;
    rating: number;
    author: Author;
};
