import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "../../../types/Category";

const API_URL = "/api/categories";

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios
            .get<Category[]>(API_URL)
            .then((response) => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to fetch categories");
                setLoading(false);
                console.error(err);
            });
    }, []);

    return { categories, loading, error };
}
