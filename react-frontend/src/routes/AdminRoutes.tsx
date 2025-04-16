import { RouteObject } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageOrders from "../pages/admin/ManageOrders";
import ManageBooks from "../pages/admin/ManageBooks";
import ManageCategories from "../pages/admin/ManageCategories";
import ManageUsers from "../pages/admin/ManageUsers";
import AdminLogin from "../pages/auth/AdminLogin";

const AdminRoutes: RouteObject[] = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "orders", element: <ManageOrders /> },
            { path: "books", element: <ManageBooks /> },
            { path: "categories", element: <ManageCategories /> },
            { path: "users", element: <ManageUsers /> },
        ],
    },
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
];

export default AdminRoutes;
