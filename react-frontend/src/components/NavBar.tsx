import logo from "../assets/images/logo.png";
import user from "../assets/svgs/user.svg";
import heart from "../assets/svgs/heart.svg";
import cart from "../assets/svgs/cart.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem("user");
        setIsLoggedIn(!!loggedIn);
    }, []);

    return (
        <nav>
            <div className="flex flex-col items-center gap-[19px] py-[46px] w-full">
                <nav className="flex items-center justify-end gap-[21px] px-[90px] py-2.5 w-full">
                    <button className="relative" aria-label="Favorites">
                        <img src={heart} alt="Heart Icon" />
                    </button>

                    <button className="relative" aria-label="Shopping cart">
                        <img src={cart} alt="Cart Icon" />
                    </button>

                    <span>|</span>

                    {!isLoggedIn ? (
                        <Link to="/login" className="text-sm font-medium hover:underline">
                            Sign In
                        </Link>
                    ) : (
                        <button className="relative" aria-label="User profile">
                            <img src={user} alt="User Icon" />
                        </button>
                    )}
                </nav>

                <nav>
                    <img src={logo} alt="Logo" />
                </nav>

                <nav>
                    <ul className="flex items-center mt-[30px] gap-[42px] self-stretch w-full">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/books">BOOKS</Link></li>
                        <li><Link to="/bestsellers">BESTSELLERS</Link></li>
                        <li><Link to="/contact">CONTACT</Link></li>
                    </ul>
                </nav>
            </div>
        </nav>
    );
};

export default NavBar;
