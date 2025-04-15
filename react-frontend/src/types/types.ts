export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: string;
    dateOfBirth: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    quantity: number;
    imageUrl: string;
    rating: number;
}

export interface CartItemType {
    id: number;
    user: User;
    product: Product;
    quantity: number;
}