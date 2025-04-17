import { useProducts, ProductCard } from "../feature/BrowseBooks";

export default function BookList() {
    const { products, loading, error } = useProducts();

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="py-4">
            <h2 className="text-xl font-medium mb-15 text-center">BOOK CATALOGUE</h2>


            {products.length > 0 ? (
                <div className="mx-[200px] grid gap-8 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] justify-items-center">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

            ) : (
                <p className="text-center text-gray-500">No books found.</p>
            )}
        </div>
    );
}
