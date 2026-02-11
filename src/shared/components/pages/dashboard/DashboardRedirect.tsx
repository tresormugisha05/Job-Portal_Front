import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function DashboardRedirect() {
    const { role, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const roleNormalized = role?.toUpperCase();

    switch (roleNormalized) {
        case "ADMIN":
            return <Navigate to="/dashboard/admin" replace />;
        case "EMPLOYER":
            return <Navigate to="/dashboard/employer" replace />;
        case "CANDIDATE":
        default:
<<<<<<< HEAD
            return <Navigate to="/dashboard/profile" replace />;
=======
            return <Navigate to="/dashboard/candidate" replace />;
>>>>>>> c03526dd92bc18056d049f58c39b3f33d5d3f5b1
    }
}
