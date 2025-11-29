// src/cropcircle/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { mongoUser, authLoading } = useAuth();

  // Still checking auth
  if (authLoading) return <div>Loading...</div>;

  // Not logged in
  if (!mongoUser) {
    return <Navigate to="/glogin" replace />;
  }

  return children;
}
