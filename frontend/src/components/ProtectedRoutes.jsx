import { useNavigate } from "react-router-dom";

function ProtectedRoutes({ user, children }) {
  const navigate = useNavigate(null);
  if (!user || !user._id) {
    navigate("/");
  } else {
    return children;
  }
}

export default ProtectedRoutes;
