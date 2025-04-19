import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { ProfilePicture } from "./ProfilePicture";

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const logout = useLogout();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleAccount = () => {
        const navigate = useNavigate();
        navigate("/account");
    }

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
                            className={`relative cursor-pointer transition-shadow duration-300 rounded-full ${isDropdownOpen ? "drop-shadow-xl" : ""
                                } hover:drop-shadow-xl`}
                            aria-label="User profile"
                        >
                            <ProfilePicture user={user} />
                            {/* <img src={userIcon} alt="User Icon" className="w-8 h-8" /> */}
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 bg-white border-black/10 border w-max">
                                <button
                                    onClick={handleAccount}
                                    className="w-full cursor-pointer px-4 py-4 text-lg font-medium text-gray-700 hover:bg-black hover:text-white transition-all duration-300 border-b-black/10 border-b"
                                >
                                    Account
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full cursor-pointer px-4 py-4 text-lg font-medium text-gray-700 hover:bg-black hover:text-white transition-all duration-300 border-b-black/10 border-b"
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
