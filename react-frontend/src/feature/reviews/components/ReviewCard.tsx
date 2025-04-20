import { useState } from "react";
import { ProfilePicture } from "../../../components/ProfilePicture";
import { Review } from "../../../types/Review";
import StarRating from "../../book-list/components/StarRating";
import ReviewApi from "../service/ReviewApi";

interface ReviewCardProps {
    review: Review;
    editable?: boolean;
    onReviewDeleted?: () => void;
    onReviewUpdated?: () => void;
    showNoti?: (message: string, type?: "success" | "error") => void;
}

export const ReviewCard = ({
    review,
    editable,
    onReviewDeleted,
    onReviewUpdated,
    showNoti: externalShowNoti,
}: ReviewCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [comment, setComment] = useState(review.comment || "");
    const [rating, setRating] = useState<number>(review.rating);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Local notification fallback
    const [notiMessage, setNotiMessage] = useState<string | null>(null);
    const [notiType, setNotiType] = useState<"success" | "error">("success");

    const showNoti = (message: string, type: "success" | "error" = "success") => {
        if (externalShowNoti) {
            externalShowNoti(message, type);
        } else {
            if (notiMessage) return;
            setNotiMessage(message);
            setNotiType(type);
            setTimeout(() => setNotiMessage(null), 3000);
        }
    };

    const formattedDate = new Date(review.createdAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const handleDelete = async () => {
        try {
            await ReviewApi.deleteReview(review.id);
            onReviewDeleted?.();
            showNoti("✅ Review deleted successfully", "success");
        } catch (err) {
            showNoti("❌ Failed to delete review", "error");
            console.error("Failed to delete:", err);
        }
    };

    const handleUpdate = async () => {
        if (!comment.trim()) {
            setError("Review comment cannot be empty.");
            return;
        }

        try {
            setSubmitting(true);
            await ReviewApi.updateReview(review.id, { comment, rating });
            setIsEditing(false);
            onReviewUpdated?.();
            showNoti("✅ Review updated successfully", "success");
        } catch (err) {
            showNoti("❌ Failed to update review", "error");
            console.error("Update failed:", err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            {notiMessage && (
                <div
                    className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md z-50 text-white ${notiType === "success" ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    {notiMessage}
                </div>
            )}

            <li className="p-4 rounded flex flex-1 gap-5 border-b border-b-black/10">
                <ProfilePicture user={review.user} height="h-12" />
                <div className="flex flex-col gap-3 w-full">
                    <h2 className="font-semibold">
                        {review.user.firstName} {review.user.lastName}
                    </h2>
                    {isEditing ? (
                        <>
                            <textarea
                                className="border p-2 w-full"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <StarRating rating={rating} setRating={setRating} clickable />
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            <div className="flex gap-2 mt-2">
                                <button
                                    onClick={handleUpdate}
                                    disabled={submitting}
                                    className="bg-black px-4 py-1 text-white"
                                >
                                    {submitting ? "Saving..." : "Save"}
                                </button>
                                <button onClick={() => setIsEditing(false)} className="border px-4 py-1">
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <StarRating rating={review.rating} />
                            <p className="text-gray-500 text-sm">{formattedDate}</p>
                            <p className="whitespace-pre-wrap break-words">{review.comment}</p>
                            {editable && (
                                <div className="flex gap-2 text-sm mt-2">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-black-600 underline cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="text-red-600 underline cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </li>
        </>
    );
};
