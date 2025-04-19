import { ProfilePicture } from "../../../components/ProfilePicture";
import { Review } from "../../../types/Review";
import StarRating from "../../book-list/components/StarRating";

export const ReviewCard = ({ review }: { review: Review }) => {
    const date = new Date(review.createdAt);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return (
        <li className="p-4 rounded flex flex-1 gap-5 border-b border-b-black/10">
            <ProfilePicture user={review.user} height="h-12" />
            <div className="flex flex-col gap-3">
                <h2 className="font-semibold">{review.user.firstName} {review.user.lastName}</h2>
                <StarRating rating={review.rating} />
                <p className="text-gray-500 text-sm">{formattedDate}</p>
                <p>{review.comment}</p>
            </div>
        </li>
    );
}