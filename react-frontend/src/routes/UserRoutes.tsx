import { RouteObject } from "react-router-dom";
import PurchaseHistory from "../pages/user/PurchaseHistory";
import RequireAuth from "./guards/RequireAuth";
import Profile from "../pages/user/Profile";
import UserLayout from "../layouts/UserLayout";

const UserRoutes: RouteObject[] = [
    {
        path: "/account",
        element: <UserLayout />,
        children: [
            { path: "", element: <RequireAuth><Profile /></RequireAuth> },
            { path: "orders", element: <RequireAuth><PurchaseHistory /></RequireAuth> },
        ],
    },
];

export default UserRoutes;
