import cartIcon from "@assets/svgs/add-to-cart-icon.svg";
import { useNavigate } from "react-router";
import CartApi from "../../feature/cart/service/CartApi";
import axios from "axios";
import { Product } from "../../types/Product";

interface AddToCartButtonProps {
  product: Product;
}
export const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const navigate = useNavigate();
  const outOfStock = product.quantity < 1;

  const handleAddToCart = (productId: number) => {
    CartApi.addCartItem(productId)
      .then(() => {
        alert("Product added to cart!");
        navigate("/cart");
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          alert(err.response?.data?.message || "Failed to add to cart.");
          console.error("Add to cart error:", err);
        } else {
          alert("Unknown error");
          console.error(err);
        }
      });
  };

  return (
    <button
      disabled={outOfStock}
      onClick={() => handleAddToCart(product.id)}
      className="bg-black cursor-pointer text-white hover:bg-black/80"
    >
      {outOfStock ? (
        <div className="flex gap-2 px-5 cursor-not-allowed py-2 justify-center items-center bg-gray">
          Out Of Stock
        </div>
      ) : (
        <div className="flex gap-2 px-5 py-2 justify-center items-center">
          {" "}
          Add <img src={cartIcon} width={20} alt="" />{" "}
        </div>
      )}
    </button>
  );
};
