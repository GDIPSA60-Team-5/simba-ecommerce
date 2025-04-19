import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../../types/Product";
import { useParams } from "react-router-dom";


export function useSingleProduct() {
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        axios
            .get<Product>(`/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch product");
                setLoading(false);
                console.error(err);
            });
    }, [id]);

    return { product, loading, error };
}
