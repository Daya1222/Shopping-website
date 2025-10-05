import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext.jsx";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="h-full flex justify-center items-center">
      Welcome, {user?.name || "Guest"}!
    </div>
  );
}

export default Home;
