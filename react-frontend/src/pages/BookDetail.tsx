import { Link } from "react-router-dom";
import { ProductDetailCard } from "../feature/book-list/components/ProductDetailCard";
import { ReviewList } from "../feature/reviews/components/ReviewList";

const BookDetail = () => {

    return (
        <section className="mx-auto w-[600px] mt-15">
            <Link className="hover:underline uppercase text-sm" to="/books">&#8592; Back To Catalogue</Link>
            <ProductDetailCard />
            <ReviewList />
        </section>
    );
};

export default BookDetail;
