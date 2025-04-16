import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import user from "../assets/svgs/user.svg";
import { Link } from "react-router-dom";

const Profile = () => {
    const { isAuthenticated, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    return (
        <>
            {
                !isAuthenticated ? (
                    <Link to="/login" className="text-sm font-medium hover:underline">
                        Sign In
                    </Link>
                ) : (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="relative"
                            aria-label="User profile"
                        >
                            <img src={user} alt="User Icon" className="w-8 h-8" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md">
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )
            }
        </>
    );
};

export default Profile;
