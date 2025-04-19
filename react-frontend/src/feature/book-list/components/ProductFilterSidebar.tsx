import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";

export const ProductFilterSideBar = () => {

    return (
        <div className="w-1/5 pr-5">
            <CategoryFilter />
            <PriceFilter />
        </div>
    );
};
