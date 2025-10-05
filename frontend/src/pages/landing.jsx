import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Landing() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/service/get-current-user`,
          {
            withCredentials: true,
          },
        );

        if (res.data.user) {
          const storedUser = JSON.parse(localStorage.getItem("user") || "null");
          if (
            !storedUser ||
            JSON.stringify(storedUser) !== JSON.stringify(res.data.user)
          ) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
          }
          setUser(res.data.user);
          navigate("/home");
        }
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <div> why the hech is thi sbeign rendered</div>;
}

export default Landing;
