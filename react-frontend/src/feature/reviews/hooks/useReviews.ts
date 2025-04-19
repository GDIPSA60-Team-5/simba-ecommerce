import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import ReviewApi from "../service/ReviewApi";
import { Review } from "../../../types/Review";

export function useReviewsByProduct() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    const fetchReviews = useCallback(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        ReviewApi.getReviewsByProduct(id)
            .then((response) => {
                setReviews(response);
            })
            .catch((err) => {
                setError("Failed to fetch reviews");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return { reviews, loading, error, refreshReviews: fetchReviews };
}
