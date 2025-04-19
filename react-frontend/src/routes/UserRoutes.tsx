import { RouteObject } from "react-router-dom";
import OrderHistory from "../pages/user/OrderHistory";
import RequireAuth from "./guards/RequireAuth";
import Profile from "../pages/user/Profile";
import UserLayout from "../layouts/UserLayout";

const UserRoutes: RouteObject[] = [
    {
        path: "/account",
        element: <UserLayout />,
        children: [
            { path: "", element: <RequireAuth><Profile /></RequireAuth> },
            { path: "orders", element: <RequireAuth><OrderHistory /></RequireAuth> },
            { path: "orders/:id", element: <RequireAuth><OrderHistory /></RequireAuth> }
        ],
    },
];

export default UserRoutes;
