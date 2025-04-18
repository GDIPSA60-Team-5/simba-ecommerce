import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../../types/Product";
import { useFilters } from "../../../context/FilterContext";
import { PageResponseDTO } from "../../../types/PageResponseDTO";

const API_URL = "/api/products";

export function useProducts() {
    const { filters } = useFilters();
    const [products, setProducts] = useState<Product[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const query = new URLSearchParams();
        Object.entries(filters).forEach(([key, val]) => {
            if (val !== undefined && val !== "") {
                query.append(key, String(val));
            }
        });

        const timer = setTimeout(() => {
            axios
                .get<PageResponseDTO<Product>>(`${API_URL}?${query.toString()}`)
                .then((response) => {
                    const page = response.data;
                    setProducts(page.content);
                    setTotalPages(page.totalPages);
                    setTotalElements(page.totalElements);
                    setLoading(false);
                })
                .catch((err) => {
                    setError("Failed to fetch products");
                    setLoading(false);
                    console.error(err);
                });
        }, 1000);

        return () => clearTimeout(timer);
    }, [filters]);

    return {
        products,
        totalPages,
        totalElements,
        loading,
        error
    };
}
