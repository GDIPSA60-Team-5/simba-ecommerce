import { RouteObject } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import BookList from "../pages/BookList";
import BookDetail from "../pages/BookDetail";
import About from "../pages/About";
import Contact from "../pages/Contact";
import BestSellers from "../pages/Bestsellers";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import RequireNoAuth from "./guards/RequireNoAuth";
import Cart from "../pages/Cart";
import RequireAuth from "./guards/RequireAuth";
import CheckoutPage from "../feature/stripe/components/StripeCheckoutPage"; 

const PublicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <Home /> },
            { path: "books", element: <BookList /> },
            { path: "books/:id", element: <BookDetail /> },
            { path: "bestsellers", element: <BestSellers /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },

            // User Only Routes 
            { path: "cart", element: <RequireAuth><Cart /></RequireAuth> },
            { path: "checkout", element: <RequireAuth><CheckoutPage /></RequireAuth>},

            // Non-User Only Routes
            { path: "login", element: <RequireNoAuth><Login /></RequireNoAuth> },
            { path: "signup", element: <RequireNoAuth> <Register /></RequireNoAuth> },
        ],
    },
];

export default PublicRoutes;
