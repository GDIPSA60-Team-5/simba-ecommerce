import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <>
            <Link to="/">
                <img src="/images/logo.png" alt="site logo" />
            </Link>
        </>
    )
};

export default Logo;