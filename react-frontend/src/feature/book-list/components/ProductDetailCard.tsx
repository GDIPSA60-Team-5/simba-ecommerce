import { AddToCartButton } from "../../../components/ui/Buttons";
import StarRating from "../../../feature/book-list/components/StarRating";
import { useSingleProduct } from "../../../feature/book-list/hooks/useSingleProduct";

export const ProductDetailCard = () => {
    const { product, loading, error } = useSingleProduct();
    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!product) return <div>Book not found</div>;

    return (
        <div className="flex gap-30 mt-10 product-details mb-40">
            <img
                src={product.imageUrl}
                alt={product.name}
                className="card-img object-cover w-[250px] min-h-[250px]" />
            <div className="product-content flex flex-col justify-between">
                <div className="detail-group">

                    <h2 className="product-title text-3xl">
                        {product.name}
                    </h2>
                    <h3 className="font-light">By {product.author.name}</h3>
                </div>
                <div className="flex gap-3">
                    <StarRating rating={product.rating}></StarRating>
                    {product.rating}
                </div>
                <p className="product-description">{product.description}</p>
                <AddToCartButton productId={product.id} />

            </div>
        </div>
    );
}