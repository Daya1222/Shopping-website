import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";

function ProtectedRoutes({ children, sellerOnly = false, adminOnly = false }) {
  const { user, loading } = useUser(); // assume your hook can expose a loading state
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // don’t redirect until we know
    if (!user || !user._id) {
      navigate("/");
    } else if (sellerOnly && user.role !== "seller") {
      navigate("/");
    }
  }, [user, sellerOnly, navigate, loading]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!user || (sellerOnly && user.role !== "seller")) {
    return null;
  }

  if (!user || (adminOnly && user.role !== "admin")) {
    return null;
  }

  return children;
}

export default ProtectedRoutes;
