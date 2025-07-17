import { Navigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  if (!user || !allowedRoles.includes(user?.role?.toLowerCase())) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
