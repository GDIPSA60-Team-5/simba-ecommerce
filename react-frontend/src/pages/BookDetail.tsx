import { Link } from "react-router-dom";
import { ProductDetailCard } from "../feature/BrowseBooks/components/ProductDetailCard";

const BookDetail = () => {

    return (
        <section className="mx-auto w-[600px]">
            <Link className="hover:underline uppercase text-sm" to="/books">&#8592; Back To Catalogue</Link>
            <ProductDetailCard />
        </section>
    );
};

export default BookDetail;
