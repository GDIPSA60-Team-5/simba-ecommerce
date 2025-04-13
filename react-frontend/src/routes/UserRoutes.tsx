import { RouteObject } from "react-router-dom";
import PurchaseHistory from "../pages/user/PurchaseHistory";
import UserLayout from "../layouts/UserLayout";

const UserRoutes: RouteObject[] = [
    {
        path: "/account",
        element: (
            <UserLayout />
        ),
        children: [
            { path: "history", element: <PurchaseHistory /> },
        ],
    },
];

export default UserRoutes;
