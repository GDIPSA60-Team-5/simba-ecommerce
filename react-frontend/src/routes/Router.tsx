import { BrowserRouter, Routes, Route, RouteObject } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import NotFound from "../pages/NotFound";

const renderRoute = (route: RouteObject) => {
    if (route.children) {
        return (
            <Route key={route.path} path={route.path} element={route.element}>
                {route.children.map(renderRoute)}
            </Route>
        );
    }

    return <Route key={route.path} path={route.path} element={route.element} />;
};

const Router = () => {
    const allRoutes = [...PublicRoutes, ...AdminRoutes, ...UserRoutes];

    return (
        <BrowserRouter>
            <Routes>
                {allRoutes.map(renderRoute)}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
