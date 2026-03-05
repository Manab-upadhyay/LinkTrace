import { Navigate, Outlet } from "react-router-dom";

export function PublicOnlyRoute() {
  const isAuthenticated = !!localStorage.getItem("auth-storage");
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}
