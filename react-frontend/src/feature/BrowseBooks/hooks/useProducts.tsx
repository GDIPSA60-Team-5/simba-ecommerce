import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../../types/Product";

const API_URL = "http://localhost:8080/api/products";

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<Product[]>(API_URL)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch products");
                setLoading(false);
                console.error(err);
            });
    }, []);

    return { products, loading, error };
}
