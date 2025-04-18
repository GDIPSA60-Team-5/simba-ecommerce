// components/CategoryFilter.tsx
import arrowDown from "@assets/svgs/arrow-down.svg";
import { useState } from "react";
import { useFilters } from "../../../context/FilterContext";
import { useDebouncedCallback } from "../../../hooks/useDebounce";


export const PriceFilter = () => {
    const [showPrice, setshowPrice] = useState(true);
    const { filters, updateFilter } = useFilters();
    const debouncedUpdate = useDebouncedCallback((col, val) => updateFilter(col, val), 1000);

    return (
        <div className="mb-20">
            <div className="flex justify-between">
                <h2 className="font-light mb-10">Price</h2>
                <button className="max-h-min" onClick={() => setshowPrice((prev) => !prev)}>
                    <img
                        src={arrowDown}
                        alt="Toggle"
                        className={`w-5 h-5 transform ${showPrice ? "rotate-0" : "-rotate-180"} transition-transform duration-300`}
                    />
                </button>
            </div>

            {showPrice && (
                <section className="price-filter flex flex-col gap-3">
                    <div className="price-group flex-col gap-1">
                        <label htmlFor="minPrice">Min.</label>
                        <input className="border border-black/30 px-2 py-2 w-full hover:border-black hover:border-2 transition-colors duration-300"
                            type="number"
                            name="minPrice"
                            id="minPrice"
                            value={filters.minPrice}
                            onChange={(e) => debouncedUpdate("minPrice", e.target.value)} />
                    </div>
                    <div className="price-group">
                        <label htmlFor="minPrice">Max.</label>
                        <input className="border border-black/30 px-2 py-2 w-full hover:border-black hover:border-2 transition-colors duration-300"
                            type="number" name="" id="minPrice" value={filters.maxPrice}
                            onChange={(e) => debouncedUpdate("maxPrice", e.target.value)} />
                    </div>
                </section>

            )}
        </div>
    );
};
