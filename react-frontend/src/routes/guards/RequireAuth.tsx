import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return <>{children}</>;
};

export default RequireAuth;
