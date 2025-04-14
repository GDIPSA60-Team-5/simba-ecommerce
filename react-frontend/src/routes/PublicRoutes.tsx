import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import BookList from "../pages/BookList";
import BookDetail from "../pages/BookDetail";
import About from "../pages/About";
import Contact from "../pages/Contact";

const PublicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <Home />,
        index: true,
    },
    {
        path: "/books",
        element: <BookList />,
    },
    {
        path: "/books/:id",
        element: <BookDetail />,
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/contact",
        element: <Contact />,
    },
];

export default PublicRoutes;
