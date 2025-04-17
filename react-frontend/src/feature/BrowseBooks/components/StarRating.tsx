import fullStar from "@assets/svgs/full-star.svg";
import halfStar from "@assets/svgs/half-star.svg";
import emptyStar from "@assets/svgs/no-star.svg";

export default function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <img key={`full-${i}`} src={fullStar} alt="Full Star" className="w-5 h-5" />
            ))}
            {hasHalfStar && (
                <img src={halfStar} alt="Half Star" className="w-5 h-5" />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <img key={`empty-${i}`} src={emptyStar} alt="Empty Star" className="w-5 h-5" />
            ))}
        </div>
    );
}
