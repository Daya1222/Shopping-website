import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ user, children }) {
  const navigate = useNavigate(null);
  if (!user || !user.isVerified) {
    navigate("/login");
  } else {
    return children;
  }
}

export default ProtectedRoutes;
