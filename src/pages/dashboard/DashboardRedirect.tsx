import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

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
      return <Navigate to="/dashboard/candidate" replace />;
  }
}
