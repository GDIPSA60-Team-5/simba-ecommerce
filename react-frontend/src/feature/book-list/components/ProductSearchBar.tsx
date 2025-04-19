import searchIcon from "@assets/svgs/search-icon.svg";
import { useFilters } from "../../../context/FilterContext";

export const ProductSearchBar = () => {
    const { filters, updateFilter } = useFilters();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim().length > 0 || value == "") updateFilter("keywords", value);
    };

    return (
        <div className="search-bar-group flex justify-end">
            <input
                className="border border-black placeholder:text-xs px-2"
                type="text"
                placeholder="Search name, author, genre..."
                value={filters.keywords}
                onChange={handleInputChange}
            />
            <button className="px-2 py-2 bg-black">
                <img src={searchIcon} alt="search icon" />
            </button>
        </div>
    );
};
