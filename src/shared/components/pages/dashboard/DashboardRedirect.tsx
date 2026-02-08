import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function DashboardRedirect() {
    const { role, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    switch (role) {
        case "ADMIN":
            return <Navigate to="/dashboard/admin/stats" replace />;
        case "EMPLOYER":
            return <Navigate to="/dashboard/manage-jobs" replace />;
        case "CANDIDATE":
        default:
            return <Navigate to="/dashboard/applied-jobs" replace />;
    }
}
