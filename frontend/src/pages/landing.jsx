import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/producCard";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Landing() {
  return <div className="grid grid-cols-4">landing</div>;
}

export default Landing;
