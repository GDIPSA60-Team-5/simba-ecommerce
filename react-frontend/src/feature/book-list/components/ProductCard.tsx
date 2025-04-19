import { Product } from "../../../types/Product";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import ProductCategoryTag from "./ProductCategoryTag";
import axios from "axios";
import eyeIcon from "@assets/svgs/eye.svg";
import { AddToCartButton } from "../../../components/ui/Buttons";


export function ProductCard({ product }: { product: Product }) {
  const handleAddToCart = (productId:number) => {
    axios.post(`http://localhost:8080/api/cart/add`, null, {
      params: {
        productId: productId
      },
      withCredentials: true
      })
    .then(() => {
      alert("Product added to cart!");
    })
    .catch(err => {
      alert(err.response?.data?.message || "Failed to add to cart.");
      console.error("Add to cart error:", err);
    });
  };

  const OnClick = () => {
    handleAddToCart(product.id)
  };
  return (
    <div className="product-card w-full">
      <Link to={`/books/${product.id}`} className="relative block transition-transform duration-300 hover:scale-105">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="card-img object-cover w-full min-h-[250px]" />

        <div className="absolute inset-0 flex bg-black/50 justify-center items-center opacity-0 hover:opacity-100  transition-opacity">
          <span className="text-white text-lg opacity-100">
            <img src={eyeIcon} width={40} alt="" />
          </span>
        </div>
      </Link>


      <ProductCategoryTag category={product.category.name} />

      <div className="card-content flex justify-between mt-3 w-full mb-2">
        <div className="card-info">
          <p className="font-normal text-l">{product.name.length > 12 ? `${product.name.slice(0, 12)}...` : product.name}</p>
          <p className="font-semibold whitespace-nowrap">
            By {product.author.name}
          </p>
          <StarRating rating={product.rating} />
        </div>
        <div className="card-price font-semibold">
          ${product.price.toFixed(2)}
        </div>
      </div>
      {/* <button onClick={() => handleAddToCart(product.id)} className="bg-black cursor-pointer flex gap-2 px-5 py-2 justify-center items-center mt-2 text-white">
        Add
        <img src={cartIcon} width={20} alt="" />
      </button> */}

      <AddToCartButton OnClick={OnClick} />
    </div >

  );
}
