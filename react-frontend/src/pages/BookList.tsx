import { useProducts, ProductCard } from "../feature/BrowseBooks";


export default function BookList() {
    const { products, loading, error } = useProducts();

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="px-[300px] py-4">
            <h2 className="text-xl font-bold mb-6 text-center">Our Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-30">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
