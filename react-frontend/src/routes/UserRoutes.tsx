import { RouteObject } from "react-router-dom";
import PurchaseHistory from "../pages/user/PurchaseHistory";
import UserLayout from "../layouts/UserLayout";
import Layout from "../layouts/Layout";
import RequireAuth from "./guards/RequireAuth";

const UserRoutes: RouteObject[] = [
    {
        path: "/account",
        element: (
            <Layout />
        ),
        children: [
            { path: "", element: <RequireAuth><PurchaseHistory /></RequireAuth> },
        ],
    },
];

export default UserRoutes;
