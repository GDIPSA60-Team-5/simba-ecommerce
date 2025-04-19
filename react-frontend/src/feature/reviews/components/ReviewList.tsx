import { useReviewsByProduct } from "../hooks/useReviews";
import { ReviewCard } from "./ReviewCard";
import { ReviewForm } from "./ReviewForm";

export const ReviewList = () => {
    const { refreshReviews, reviews, loading, error } = useReviewsByProduct();

    if (loading) {
        return (
            <div className="py-10 text-center text-gray-500">
                Loading reviews...
            </div>
        );
    }

    if (error) {
        return (
            <div className=" mb-15 py-10 text-center text-red-500">
                Failed to load reviews. Please try again later.
            </div>
        );
    }

    return (
        <div className="mb-15">
            <h1 className="text-2xl mb-15 font-semibold text-center uppercase">Reviews</h1>

            <ReviewForm refreshReviews={refreshReviews} />


            {reviews.length === 0 ? (
                <p className="text-gray-500 text-center">No reviews yet.</p>
            ) : (
                <ul className="flex flex-1 flex-col items-center w-max">
                    <div>
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </ul>
            )}
        </div>
    );
};
