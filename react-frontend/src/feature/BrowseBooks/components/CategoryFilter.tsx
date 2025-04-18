import arrowDown from "@assets/svgs/arrow-down.svg";
import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useFilters } from "../../../context/FilterContext";

export const CategoryFilter = () => {
    const { categories, loading } = useCategories();
    const { filters, updateFilter } = useFilters();
    const [showGenres, setShowGenres] = useState(true);

    const handleCategorySelect = (id: number | undefined) => {
        updateFilter("categoryId", id);
    };

    return (
        <div className="mb-10">
            <div className="flex justify-between">
                <h2 className="font-light mb-5">Genre</h2>
                <button className="max-h-min" onClick={() => setShowGenres((prev) => !prev)}>
                    <img
                        src={arrowDown}
                        alt="Toggle"
                        className={`w-5 h-5 transform ${showGenres ? "rotate-0" : "-rotate-180"} transition-transform duration-300`}
                    />
                </button>
            </div>

            {showGenres && (
                <ul className="space-y-2 list-disc mt-2">
                    {loading ? (
                        <li>Loading...</li>
                    ) : (
                        <>
                            <li
                                onClick={() => handleCategorySelect(undefined)}
                                className={`cursor-pointer hover:font-bold transition-all duration-300 ${filters.categoryId == null ? "font-bold" : ""}`}
                            >
                                All
                            </li>
                            {categories.map((cat) => (
                                <li
                                    key={cat.id}
                                    onClick={() => handleCategorySelect(cat.id)}
                                    className={`cursor-pointer hover:font-bold transition-all duration-300  ${filters.categoryId === cat.id ? "font-bold" : ""}`}
                                >
                                    {cat.name}
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            )}
        </div>
    );
};
