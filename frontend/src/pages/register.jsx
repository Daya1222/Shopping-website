import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/vector-arrow.png";
import google from "../assets/google.svg";
import logo from "../assets/social.png";
import bag from "../assets/shopping-bag.png";
import people from "../assets/people.svg";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/service/get-current-user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/home");
        } else {
          setStep(1);
        }
      })
      .catch((err) => {
        console.error(err);
        setStep(1);
      });
  }, []);

  useEffect(() => {
    if (step === 2) {
      const validate = async () => {
        // Validate name first
        const nameValid = validateName(name);
        if (!nameValid) {
          setStep(1);
          return;
        }

        // Then validate email
        await validateEmail(email);
      };

      validate();
    }
  }, [step, name, email]);

  // Validate name function
  function validateName(name) {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      setNameError("Name cannot be empty");
      return false;
    }

    const words = trimmedName.split(/\s+/);
    if (words.length === 1) {
      setNameError("Please enter full name");
      return false;
    }

    setNameError("");
    return true;
  }

  // Validate email function
  async function validateEmail(email) {
    try {
      const res = await axios.post(
        `${API_BASE}/api/service/validate-email`,
        { email },
        { headers: { "Content-Type": "application/json" } },
      );

      if (res.status === 200) {
        setEmailError("");
        setStep(3);
        return true;
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 400) {
        setEmailError("Invalid Email");
        setStep(1);
        return false;
      } else if (status === 409) {
        setEmailError("Email already registered");
        setStep(1);
        return false;
      } else {
        console.error(err.response?.data || err.message);
        setEmailError("Server error, please try again");
        setStep(1);
        return false;
      }
    }
  }

  // Password validation
  function checkPassword() {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      passwordRef.current.focus();
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain a capital letter");
      passwordRef.current.focus();
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("Password must contain a numeric character");
      passwordRef.current.focus();
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Password must contain a special character");
      passwordRef.current.focus();
    } else {
      confPasswordRef.current.focus();
      setPasswordError("");
    }
  }

  // Confirm password validation
  function checkConfirmPassword() {
    if (passwordError !== "") {
      passwordRef.current.focus();
      setConfPasswordError("");
    } else if (password !== confPassword) {
      setConfPasswordError("Passwords do not match");
    } else if (password === confPassword) {
      setConfPasswordError("");
      handleSubmit();
    }
  }

  function clearStates() {
    setName("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setNameError("");
    setPasswordError("");
    setConfPasswordError("");
  }

  // Submit the data
  async function handleSubmit() {
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });

      console.log(res.data);

      if (res.status === 200) {
        clearStates();
        navigate("/login");
      } else {
        clearStates();
        navigate("/500");
      }
    } catch (error) {
      console.error("❌ Request failed:", error);
      clearStates();
      navigate("/500");
    }
  }

  if (step === 0) return null;

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full min-h-full justify-center items-center bg-gradient-to-r from-[#BED3DC] to-[#CAD9D4] transition-all duration-500 md:gap-14 lg:gap-16">
        {/* Graphics */}
        <div className="md:w-7/12 md:flex hidden justify-center items-center">
          <img src={people} alt="people" />
        </div>
        <div className="md:hidden flex justify-center items-center gap-2 pt-8">
          <img src={bag} alt="bag" className="w-10 mb-4" />
          <p className="text-2xl font-bold mb-4 text-gray-700">Welcome!</p>
        </div>

        {/* Register form */}
        <div className="flex justify-center items-center md:w-3/12 md:min-w-sm w-sm h-auto md:pr-6 py-8">
          <div className="flex flex-col justify-center items-center w-full max-w-md bg-white gap-4 rounded-2xl shadow-lg p-4">
            {/* Form Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="hidden md:flex text-2xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
                Welcome!
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-gray-800">Register</div>
                <div>
                  <span className="text-3xl font-bold text-gray-800">
                    your{" "}
                  </span>
                  <span className="bg-gradient-to-r from-[#C0E1F2] to-[#99E0C9] text-transparent bg-clip-text text-3xl font-bold">
                    ɑccount
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Already have an account?{" "}
                <span
                  className="text-cyan-800 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </div>
            </div>

            {step === 1 && (
              <form className="flex flex-col gap-4 w-full items-center">
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const nameValid = validateName(name);
                      if (nameValid) {
                        emailRef.current.focus();
                      }
                    }
                  }}
                  ref={nameRef}
                  className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
                  aria-label="Full name"
                />
                {nameError && (
                  <div className="text-red-600 text-sm" role="alert">
                    {nameError}
                  </div>
                )}

                <input
                  type="email"
                  name="Email"
                  value={email}
                  placeholder="example@mail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setStep(2);
                    }
                  }}
                  ref={emailRef}
                  className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
                  aria-label="Email address"
                />
                {emailError && (
                  <div className="text-red-600 text-sm" role="alert">
                    {emailError}
                  </div>
                )}

                <button
                  type="button"
                  className="bg-gray-800 text-white w-4/5 h-12 rounded-lg hover:bg-gradient-to-r hover:from-[#C0E1F2] hover:to-[#99E0C9] hover:text-gray-800 transition"
                  onClick={() => setStep(2)}
                >
                  Next →
                </button>
              </form>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-4 w-full items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
                <p className="text-gray-800 text-xl font-semibold">
                  Validating email...
                </p>
              </div>
            )}

            {step === 3 && (
              <form className="flex flex-col gap-4 w-full items-center">
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="New Password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      checkPassword();
                    }
                  }}
                  ref={passwordRef}
                  className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
                  aria-label="New password"
                />
                {passwordError && (
                  <div className="text-red-600 text-sm" role="alert">
                    {passwordError}
                  </div>
                )}

                <input
                  type="password"
                  name="confPassword"
                  value={confPassword}
                  placeholder="Confirm password"
                  onChange={(e) => setConfPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      checkConfirmPassword();
                    }
                  }}
                  ref={confPasswordRef}
                  className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
                  aria-label="Confirm password"
                />
                {confPasswordError && (
                  <div className="text-red-600 text-sm" role="alert">
                    {confPasswordError}
                  </div>
                )}

                <button
                  type="button"
                  className="bg-gray-800 text-white w-4/5 h-12 rounded-lg hover:bg-gradient-to-r hover:from-[#C0E1F2] hover:to-[#99E0C9] hover:text-gray-800 transition"
                  onClick={() => {
                    checkConfirmPassword();
                  }}
                >
                  Register →
                </button>
              </form>
            )}

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
              <a href={`${API_BASE}/oauth/google`}>Sign up with Google</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
