import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import google from "../assets/google.svg";
import logo from "../assets/social.png";
import bag from "../assets/shopping-bag.png";
import people from "../assets/people.svg";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Validate email format
  function checkEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email cannot be empty");
      return false;
    }
    if (!regex.test(email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    passwordRef.current.focus();
    return true;
  }

  // Validate password strength
  function checkPassword() {
    if (!email.trim() || emailError) {
      setEmailError("Email cannot be empty");
      emailRef.current.focus();
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain a capital letter");
      return;
    }
    if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain a numeric character");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain a special character");
      return;
    }

    setPasswordError("");
    handleSubmit();
  }

  // Submit login request
  async function handleSubmit() {
    try {
      await axios.post(
        `${API_BASE}/auth/login`,
        { email, password },
        { withCredentials: true }, // allow cookie
      );

      // Success → clear errors and navigate
      setEmailError("");
      setPasswordError("");
      navigate("/");
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) setEmailError("Email not registered");
      else if (status === 403) setPasswordError("Wrong password");
      else if (status === 500)
        setPasswordError("Server error, try again later");
      else setPasswordError("Unknown error");
      console.error(err);
    }
  }

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      {/* Header */}
      <div className="flex w-full h-12 bg-white items-center px-4">
        <div className="flex items-center cursor-pointer">
          <img src={logo} alt="logo" className="w-10 mr-1" />
          <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-xl">
            QuickCart
          </div>
        </div>
        <a
          className="ml-auto text-cyan-800 font-medium hover:text-gray-900 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full h-[92%] justify-center items-center bg-gradient-to-r from-[#BED3DC] to-[#CAD9D4] transition-all duration-500">
        {/* Left Side Graphics */}
        <div className="md:w-7/12 md:flex hidden justify-center items-center">
          <img src={people} alt="people" />
        </div>
        <div className="md:hidden flex justify-center items-center gap-2">
          <img src={bag} alt="bag" className="w-10 mb-4" />
          <p className="text-2xl font-bold mb-4 text-gray-700">Welcome back!</p>
        </div>

        {/* Login Form */}
        <div className="flex justify-center items-center md:w-5/12 w-11/12 min-w-[300px] h-8/12">
          <div className="flex flex-col justify-center items-center w-full max-w-md h-full bg-white gap-6 rounded-2xl shadow-lg p-6">
            {/* Form Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="text-3xl font-bold text-gray-800">Log in to</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#C0E1F2] to-[#99E0C9] text-transparent bg-clip-text">
                ɑccount
              </div>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span
                  className="text-cyan-800 cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </div>
            </div>

            {/* Form Inputs */}
            <form className="flex flex-col gap-4 w-full items-center">
              <input
                type="text"
                placeholder="Email"
                value={email}
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    checkEmail();
                  }
                }}
                className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
              />
              {emailError && (
                <div className="text-red-600 text-sm">{emailError}</div>
              )}

              <input
                type="password"
                placeholder="**********"
                value={password}
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    checkPassword();
                  }
                }}
                className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
              />
              {passwordError && (
                <div className="text-red-600 text-sm">{passwordError}</div>
              )}

              <button
                type="button"
                onClick={checkPassword}
                className="bg-gray-800 text-white w-4/5 h-12 rounded-lg hover:bg-gradient-to-r hover:from-[#C0E1F2] hover:to-[#99E0C9] hover:text-gray-800 transition"
              >
                Log In →
              </button>

              <div className="text-cyan-800 text-sm">
                <a href="#">Forgot password?</a>
              </div>

              <div className="flex items-center w-full my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-2 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button
                type="button"
                className="flex items-center justify-center gap-2 w-4/5 h-12 p-3 text-gray-800 bg-[#F7F7F7] rounded-2xl hover:bg-[#E5E5E5] transition"
              >
                <img src={google} alt="google" className="h-8" />
                <span>Sign in with Google</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
