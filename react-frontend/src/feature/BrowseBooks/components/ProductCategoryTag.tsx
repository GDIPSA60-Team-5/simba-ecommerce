interface ProductCategoryTagProps {
    category: string;
}

const categoryColors: Record<string, string> = {
    Coding: "bg-blue-200",
    Travel: "bg-lime-200",
    Business: "bg-orange-200",
    Fiction: "bg-red-200",
    Default: "bg-gray-200",
};

export default function ProductCategoryTag({ category }: ProductCategoryTagProps) {
    const bgColor = categoryColors[category] || categoryColors.Default;

    return (
        <p className={`${bgColor} w-min px-5 py-1 mt-5 text-xs`}>
            {category}
        </p>
    );
}
