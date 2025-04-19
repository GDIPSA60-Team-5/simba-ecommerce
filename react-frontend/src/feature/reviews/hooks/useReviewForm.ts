import ReviewApi from "../service/ReviewApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

export function useReviewForm(refreshReviews?: () => void) {
    const { id } = useParams();

    const [content, setContent] = useState("");
    const [rating, setRating] = useState<number>(5);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            setError("Review cannot be empty.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            ReviewApi.postReview(id!, { content, rating: rating });
            setContent("");

            if (refreshReviews) refreshReviews();

        } catch (err: any) {
            setError("Something went wrong. Try again later.");

            if (err.response) {
                console.error("Backend responded with:", err.response.data);
            } else if (err.request) {
                console.error("Request was made but no response:", err.request);
            } else {
                console.error("Unknown error:", err.message);
            }
        }
        finally {
            setSubmitting(false);
        }
    };

    return {
        content,
        setContent,
        rating,
        setRating,
        submitting,
        error,
        handleSubmit,
    };
}
