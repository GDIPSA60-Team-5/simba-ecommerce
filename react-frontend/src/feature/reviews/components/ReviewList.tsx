import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useReviewsByProduct } from "../hooks/useReviews";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";

export const ReviewList = () => {
    const { refreshReviews, reviews, loading, error } = useReviewsByProduct();
    const { user } = useAuth();
    const userHasReview = user && reviews.some((review) => review.user.id === user.id);

    const [notiMessage, setNotiMessage] = useState<string | null>(null);
    const [notiType, setNotiType] = useState<"success" | "error">("success");

    const showNoti = (message: string, type: "success" | "error" = "success") => {
        setNotiMessage(message);
        setNotiType(type);
        setTimeout(() => setNotiMessage(null), 3000);
    };

    if (loading) {
        return <div className="py-10 text-center text-gray-500">Loading reviews...</div>;
    }

    if (error) {
        return <div className="mb-15 py-10 text-center text-red-500">Failed to load reviews. Please try again later.</div>;
    }

    return (
        <div className="mb-15">
            {notiMessage && (
                <div
                    className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-50 text-white ${notiType === "success" ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {notiMessage}
                </div>
            )}

            <h1 className="text-2xl mb-15 font-semibold text-center uppercase">Reviews</h1>

            <ReviewForm refreshReviews={refreshReviews} userHasReview={userHasReview} />

            {reviews.length === 0 ? (
                <p className="text-gray-500 text-center">No reviews yet.</p>
            ) : (
                <ul className="flex flex-1 flex-col w-full">
                    <div>
                        {reviews.map((review) => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                editable={review.user.id === user?.id}
                                onReviewUpdated={refreshReviews}
                                onReviewDeleted={refreshReviews}
                                showNoti={showNoti}
                            />
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
};

