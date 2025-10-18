import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import { useEffect } from "react";

function ProtectedRoutes({ children }) {
  const { user } = useUser();
  const navigate = useNavigate(null);
  if (!user || !user._id) {
    useEffect(() => {
      navigate("/");
    });
  } else {
    return children;
  }
}

export default ProtectedRoutes;
