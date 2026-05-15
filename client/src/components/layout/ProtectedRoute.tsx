import { Navigate, Outlet } from "react-router-dom";

/**
 * ProtectedRoute
 *
 * Wraps routes that require authentication.
 * Redirects unauthenticated users to the /auth page.
 */
export default function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("auth_token");

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
