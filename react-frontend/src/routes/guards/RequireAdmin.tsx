import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
    const { isAdmin } = useAuth();

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default RequireAdmin;
