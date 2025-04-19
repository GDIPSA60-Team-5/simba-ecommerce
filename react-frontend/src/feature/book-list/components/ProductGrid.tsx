import { ProductCard } from ".";
import { Pagination } from "../../../components/Pagination";
import { useProducts } from "../hooks/useProducts";

export const ProductGrid = () => {
    const { products, totalElements, totalPages, loading, error } = useProducts();

    return (
        <div className="mb-15">
            {loading ? (
                <div className="flex flex-col justify-center items-center h-[300px]">
                    <span className="loader mb-5"></span>
                    <h2 className="font-regular">Finding your books, please wait...</h2>
                    <div className="w-3 h-3 border-4 border-black bg-black rounded-full mt-5"></div>
                </div>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : products.length > 0 ? (
                <>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))] gap-5 mb-15">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <Pagination totalPages={totalPages} totalElements={totalElements}></Pagination>
                </>
            ) : (
                <p className="text-center text-black text-2xl">No books found.</p>
            )}
        </div>
    )
}