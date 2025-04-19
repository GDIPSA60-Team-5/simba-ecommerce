import arrowDown from "@assets/svgs/arrow-down.svg";
import { useState, useEffect } from "react";
import { useFilters } from "../../../context/FilterContext";

export const PriceFilter = () => {
    const [showPrice, setShowPrice] = useState(true);
    const { filters, updateFilters } = useFilters();

    const [inputMin, setInputMin] = useState(filters.minPrice?.toString() ?? "");
    const [inputMax, setInputMax] = useState(filters.maxPrice?.toString() ?? "");

    const DEBOUNCE_DELAY = 750;

    useEffect(() => {
        const timer = setTimeout(() => {
            const updates: Partial<typeof filters> = {};

            const parsedMin = parseInput(inputMin);
            if (parsedMin !== null) updates.minPrice = parsedMin;
            else if (inputMin.trim() === "") updates.minPrice = undefined;

            const parsedMax = parseInput(inputMax);
            if (parsedMax !== null) updates.maxPrice = parsedMax;
            else if (inputMax.trim() === "") updates.maxPrice = undefined;

            updateFilters(updates);
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timer);
    }, [inputMin, inputMax]);

    const parseInput = (value: string): number | null => {
        const trimmed = value.trim();
        if (trimmed === "") return null;
        const num = Number(trimmed);
        return isNaN(num) || num < 0 ? null : num;
    };

    const handleChange = (
        type: "min" | "max",
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const val = e.target.value;
        const isNotEmpty = val !== "";
        const isValidNumber = !Number.isNaN(Number(val));

        if (isNotEmpty && !isValidNumber) return;

        (type === "min" ? setInputMin : setInputMax)(val);
    };

    return (
        <div className="mb-20">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-light">Price</h2>
                <button onClick={() => setShowPrice(prev => !prev)} aria-label="Toggle price filter">
                    <img
                        src={arrowDown}
                        alt=""
                        className={`w-5 h-5 transform transition-transform duration-300 ${showPrice ? "rotate-0" : "-rotate-180"}`}
                    />
                </button>
            </div>

            {showPrice && (
                <section className="flex flex-col gap-4">
                    {["min", "max"].map((type) => {
                        const value = type === "min" ? inputMin : inputMax;
                        return (
                            <div key={type} className="flex flex-col gap-1">
                                <label htmlFor={`${type}Price`}>
                                    {type === "min" ? "Min." : "Max."}
                                </label>
                                <input
                                    id={`${type}Price`}
                                    type="number"
                                    inputMode="numeric"
                                    className="border border-black/30 px-2 py-2 w-full hover:border-black hover:border-2 transition-colors duration-300"
                                    value={value}
                                    onChange={(e) => handleChange(type as "min" | "max", e)}
                                />
                            </div>
                        );
                    })}
                </section>
            )}
        </div>
    );
};
