import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-black text-white py-8 mt-12">
            <div className="flex justify-center gap-8">
                <ul className="flex gap-8">
                    <li><Link to="/" className="hover:underline">Home</Link></li>
                    <li><Link to="/books" className="hover:underline">Books</Link></li>
                    <li><Link to="/bestsellers" className="hover:underline">Bestsellers</Link></li>
                    <li><Link to="/contact" className="hover:underline">Contact</Link></li>
                </ul>
            </div>

            <div className="text-center text-sm mt-4">
                <p>&copy; 2025 CODEX. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
