import { BrowserRouter, Routes, Route, RouteObject } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import NotFound from "../pages/NotFound";

const renderRoute = (route: RouteObject) => {
    if (route.children) {
        return (
            <Route key={route.path} path={route.path} element={route.element}>
                {route.children.map((childRoute) => renderRoute(childRoute))}
            </Route>
        );
    }

    return <Route key={route.path} path={route.path} element={route.element} />;
};

const Router = () => {
    const allRoutes: RouteObject[] = [...PublicRoutes, ...AdminRoutes, ...UserRoutes];

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {allRoutes.map((route) => renderRoute(route))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default Router;
