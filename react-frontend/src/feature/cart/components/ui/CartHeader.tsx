import { Link } from "react-router-dom"

export const CartHeader = () => {
    return (
        <div className="flex items-center justify-between mb-15 relative">
            <Link
                type="button"
                to="/books"
                className="text-gray-700 hover:text-gray-900 active:text-gray-900 font-medium transition-all duration-200 transform hover:underline hover:scale-110 active:scale-100"
            >
                &#8592; BACK TO SHOPPING
            </Link>

            {/* Title centered absolutely */}
            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-light text-center">
                My Cart
            </h1>
        </div>
    )
}