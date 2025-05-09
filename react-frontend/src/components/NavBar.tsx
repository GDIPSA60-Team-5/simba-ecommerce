import heart from "../assets/svgs/heart.svg";
import cart from "../assets/svgs/cart.svg";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import Logo from "./Logo";

const NavBar = () => {

    return (
        <nav>
            <div className="flex flex-col items-center gap-[19px] py-[46px] w-full">
                <nav className="flex items-center justify-end gap-[21px] px-[90px] py-2.5 w-full">
                    <button className="relative" aria-label="Favorites">
                        <img src={heart} alt="Heart Icon" />
                    </button>

                    <button className="relative" aria-label="Shopping cart">
                        <Link to="/cart">
                            <img src={cart} alt="Cart Icon" />
                        </Link>
                    </button>

                    <span>|</span>
                    <Profile></Profile>

                </nav>

                <nav>
                    <Logo></Logo>
                </nav>

                <nav>
                    <ul className="flex items-center mt-[30px] gap-[42px] self-stretch w-full">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/books">BOOKS</Link></li>
                        <li><Link to="/contact">CONTACT</Link></li>
                    </ul>
                </nav>
            </div>
        </nav>
    );
};

export default NavBar;
