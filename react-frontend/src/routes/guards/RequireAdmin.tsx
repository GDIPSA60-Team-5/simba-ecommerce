import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (isAdmin) return <>{children}</>;

    return <Navigate to="/login" replace />;
};


export default RequireAdmin;
