import { FilterProvider } from "../context/FilterContext";
import { ProductFilterSideBar, ProductSearchBar, ProductSelectSort, ProductGrid } from "../feature/book-list";

export default function BookList() {

    return (
        <div className="py-4">
            <h2 className="text-xl font-medium mb-15 mt-10 text-center">BOOK CATALOGUE</h2>


            <div className="flex mx-50">
                <FilterProvider>
                    <ProductFilterSideBar />

                    <div className="right-content flex flex-col w-2/3">
                        <div className="flex justify-between mb-15">
                            <ProductSelectSort />
                            <ProductSearchBar />
                        </div>
                        <ProductGrid />
                    </div>
                </FilterProvider>
            </div>
        </div>
    );
}
