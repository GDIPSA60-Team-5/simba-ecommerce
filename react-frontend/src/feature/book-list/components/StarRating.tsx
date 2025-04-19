import fullStar from "@assets/svgs/full-star.svg";
import emptyStar from "@assets/svgs/no-star.svg";

interface StarRatingProps {
    rating: number;
    setRating?: (rating: number) => void
    clickable?: boolean;
}

export default function StarRating({ rating, setRating, clickable = false }: StarRatingProps) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;

    const handleStarClick = (starIndex: number) => {
        if (setRating) {
            setRating(starIndex + 1);
        }
    };

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => (
                <img
                    key={`full-${i}`}
                    src={fullStar}
                    alt="Full Star"
                    className="w-5 h-5 cursor-pointer"
                    onClick={clickable ? () => handleStarClick(i) : undefined}
                />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
                <img
                    key={`empty-${i}`}
                    src={emptyStar}
                    alt="Empty Star"
                    className="w-5 h-5 cursor-pointer"
                    onClick={clickable ? () => handleStarClick(fullStars + i) : undefined}
                />
            ))}
        </div>
    );
}
