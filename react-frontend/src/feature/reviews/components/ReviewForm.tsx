import { Link } from "react-router-dom";
import { ProfilePicture } from "../../../components/ProfilePicture";
import { useAuth } from "../../../context/AuthContext";
import { useReviewForm } from "../hooks/useReviewForm";
import StarRating from "../../book-list/components/StarRating";


interface ReviewFormProps {
    refreshReviews: () => void;
    userHasReview?: boolean | null;
}
export const ReviewForm = ({ refreshReviews, userHasReview }: ReviewFormProps) => {
    const { user, isAuthenticated, loading } = useAuth();
    const { comment, setComment, handleSubmit, error, submitting, rating, setRating } = useReviewForm(() => {
        refreshReviews();
    });

    if (loading) return <div>Loading..</div>;

    if (!isAuthenticated) {
        return (
            <div className="text-center text-3xl mb-15 font-light">
                <Link to="/signup" className="font-light underline hover:text-black/50">Sign up</Link> to leave your review
            </div>
        );
    }

    if (userHasReview) {
        return (
            <div className="text-center text-xl mb-10 font-light text-green-700">
                ✅ Thank you for leaving a review!
            </div>
        );
    }

    return (
        <>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form onSubmit={(e) => {
                handleSubmit(e);
            }} className="flex gap-5 justify-center mb-15 items-center">
                <ProfilePicture user={user} height="h-10" />
                <div className="flex flex-col">
                    <div className="flex gap-5 mb-3">
                        <input
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="w-[400px] focus:outline-none border-b-black border-b"
                            type="text"
                            placeholder="Read the book? Express your thoughts..."
                            disabled={submitting}
                        />
                        <button
                            type="submit"
                            className="bg-black py-2 px-10 text-white"
                            disabled={submitting}
                        >
                            {submitting ? "Posting..." : "Post"}
                        </button>
                    </div>
                    <StarRating rating={rating} setRating={setRating} clickable={true} />
                </div>
            </form>
        </>
    );
};
