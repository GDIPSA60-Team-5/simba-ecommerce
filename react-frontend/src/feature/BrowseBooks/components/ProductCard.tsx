// import { Product } from "../../../types/Product";

// function ProductCard({ product }: { product: Product }) {
//   return (
//     <div className="bg-white rounded-lg overflow-hidden">
//       <img
//         src={product.imageUrl}
//         alt={product.name}
//         className="w-full object-cover"
//       />
//       <div className="p-4">
//         <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
//         <div className="flex flex-col ">
//           <span className="text-lg font-bold">
//             ${product.price}
//           </span>
//           <button className="bg-black text-white w-min whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;

import { Product } from "../../../types/Product";
import axios from "axios";


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

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <div className="flex flex-col ">
          <span className="text-lg font-bold">
            ${product.price}
          </span>
          <button onClick={() => handleAddToCart(product.id)} className="bg-black text-white w-min whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
