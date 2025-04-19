import { useFilters } from "../context/FilterContext";
import { PageButtons } from "./PageButtons";
import navArrowRight from "@assets/svgs/arrow-right.svg";
import navArrowLeft from "@assets/svgs/arrow-left.svg";

interface PaginationProps {
    totalPages: number;
    totalElements: number;
}

export const Pagination = ({
    totalPages,
    totalElements,
}: PaginationProps) => {
    const { filters, updateFilter, updateFilters } = useFilters();
    const currentPage = filters.pageNo;

    const handleClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            updateFilter("pageNo", page);
        }
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value);
        updateFilters({
            itemsPerPage: newSize,
            pageNo: 1,
        });
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">

            <div className="flex items-center gap-2">
                <label htmlFor="itemsPerPage" className="text-sm">
                    Results per page:
                </label>
                <select
                    id="itemsPerPage"
                    value={filters.itemsPerPage}
                    onChange={handlePageSizeChange}
                    className=" px-2 py-1 text-sm "
                >
                    <option value="3">3</option>
                    <option value="6">6</option>
                    <option value="9">9</option>
                    <option value="18">18</option>
                    <option value="27">27</option>
                    <option value="36">36</option>
                    <option value="45">45</option>
                </select>
            </div>


            <div className="flex items-center gap-2">
                <div className="text-sm ">
                    <div className="text-sm ">
                        <span className="font-semibold"> {(currentPage - 1) * filters.itemsPerPage + 1}{" "}-{" "}{Math.min(currentPage * filters.itemsPerPage, totalElements)}</span>{" "}
                        of {totalElements} results
                    </div>
                </div>
                <button
                    onClick={() => handleClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-transform transform hover:scale-125"
                >
                    <img
                        src={navArrowLeft}
                        alt="Previous"
                        className="w-full h-full"
                    />
                </button>

                <PageButtons
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handleClick={handleClick}
                />

                <button
                    onClick={() => handleClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-transform transform hover:scale-125"
                >
                    <img
                        src={navArrowRight}
                        alt="Next"
                        className="w-full h-full"
                    />
                </button>
            </div>
        </div>
    );
};
