import { Link } from "react-router-dom";

export const UserHeader = () => {
    return (
        <div className="flex justify-between items-center mb-6">
            <Link
                to="/account"
                className="hover:underline text-[13px] hover:text-gray-700 transition-colors duration-200"
            >
                ← BACK TO PROFILE
            </Link>

            <h1 className="text-[13px] text-black/90">
                <span className="text-gray-400">PROFILE</span> / <span className=" text-black">ORDERS</span>
            </h1>
        </div>
    );
};
