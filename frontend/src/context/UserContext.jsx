import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/service/get-current-user`,
          {
            withCredentials: true,
          },
        );

        if (res.data.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/service/get-current-user`, {
        withCredentials: true,
      });
      setUser(res.data.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loading, setLoading, refreshUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
