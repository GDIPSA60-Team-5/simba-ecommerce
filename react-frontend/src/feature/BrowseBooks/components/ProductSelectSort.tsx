import { useFilters } from "../../../context/FilterContext";


export const ProductSelectSort = () => {
    const { filters, updateFilter } = useFilters();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateFilter("sortBy", e.target.value);
    };

    const toggleSortDir = () => {
        updateFilter("sortDir", filters.sortDir === "ASC" ? "DESC" : "ASC");
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={toggleSortDir}
                className="p-1 box-content border-b-2 border-transparent rounded text-black/50 hover:text-black transition-all transform hover:scale-150"
                aria-label="Toggle Sort Direction"
            >
                {filters.sortDir === "ASC" ? "↑" : "↓"}
            </button>
            <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="focus:outline-none box-content border-b-2 border-transparent focus:border-black hover:border-black transition-all duration-200"
            >
                <option value="rating">Popular</option>
                <option value="">Latest Arrivals</option>
                <option value="price">Price</option>
                <option value="name">Title</option>
            </select>

        </div>
    );
};
