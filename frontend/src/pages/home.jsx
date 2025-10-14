import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const { user, setUser } = useContext(UserContext);

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
        }
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      Welcome, {user?.name || "Guest"}!
    </div>
  );
}

export default Home;
