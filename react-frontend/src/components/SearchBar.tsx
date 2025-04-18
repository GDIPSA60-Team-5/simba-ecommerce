import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "@assets/svgs/search-icon.svg";

export const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/books?keywords=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar flex border mb-10">
            <input
                className="px-5 py-2"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
                type="submit"
                className="bg-black text-white px-3 py-3 h-full flex items-center"
            >
                <img src={searchIcon} alt="Search" />
            </button>
        </form>
    );
};
