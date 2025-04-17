import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireNoAuth = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // Allow public users to access
    if (!isAuthenticated) return <>{children}</>;

    // Redirect to admin account
    if (isAdmin) return <Navigate to="/admin/dashboard" replace />;


    // Redirect to account if user is logged in.
    return <Navigate to="/account" replace />;
};




export default RequireNoAuth;
