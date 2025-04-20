import cartIcon from "@assets/svgs/add-to-cart-icon.svg";
import { useNavigate } from "react-router";
import CartApi from "../../feature/cart/service/CartApi";


interface AddToCartButtonProps {
    productId: number;
}
export const AddToCartButton = ({ productId }: AddToCartButtonProps) => {
    const navigate = useNavigate();

    const handleAddToCart = (productId: number) => {
        CartApi.addCartItem(productId)
            .then(() => {
                alert("Product added to cart!");
                navigate("/cart");
            })
            .catch(err => {
                alert(err.response?.data?.message || "Failed to add to cart.");
                console.error("Add to cart error:", err);
            });
    };

    return (
        <button onClick={() => handleAddToCart(productId)} className="bg-black cursor-pointer flex gap-2 px-5 py-2 justify-center items-center text-white hover:bg-black/80">
            Add

            <img src={cartIcon} width={20} alt="" />
        </button>
    );
}