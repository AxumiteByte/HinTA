import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function AdminRoute() {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== "admin") {
    return (
      <div className="text-center text-red-500 mt-20 font-semibold">
        Access Denied. Admins only.
      </div>
    );
  }

  return <Outlet />;
}
