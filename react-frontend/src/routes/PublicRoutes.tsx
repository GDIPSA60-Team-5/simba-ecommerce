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

const PublicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "books", element: <BookList /> },
            { path: "books/:id", element: <BookDetail /> },
            { path: "bestsellers", element: <BestSellers /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            { path: "login", element: <Login /> },
            { path: "signup", element: <Register /> },
        ],
    },
];

export default PublicRoutes;
