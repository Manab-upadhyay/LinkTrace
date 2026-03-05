import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("auth-storage");
  return isAuthenticated ? <Outlet /> : <Navigate to="/landing" replace />;
}
