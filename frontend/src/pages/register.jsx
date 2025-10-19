import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.svg";
import bag from "../assets/shopping-bag.png";
import people from "../assets/people.svg";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
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
    if (step === 2) {
      const validate = async () => {
        const nameValid = validateName(name);
        if (!nameValid) {
          setStep(1);
          return;
        }

        await validateEmail(email);
      };

      validate();
    }
  }, [step, name, email]);

  function validateName(nameValue) {
    const trimmedName = (nameValue || "").trim();
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

  async function validateEmail(emailValue) {
    try {
      const res = await axios.post(
        `${API_BASE}/api/service/validate-email`,
        { email: emailValue },
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

  function validatePasswordStrength(pwd) {
    const trimmedPassword = (pwd || "").trim();

    if (!trimmedPassword || trimmedPassword.length < 8) {
      return { valid: false, error: "Password must be at least 8 characters" };
    }

    if (!/[A-Z]/.test(trimmedPassword)) {
      return { valid: false, error: "Password must contain a capital letter" };
    }

    if (!/[a-z]/.test(trimmedPassword)) {
      return {
        valid: false,
        error: "Password must contain a lowercase letter",
      };
    }

    if (!/[0-9]/.test(trimmedPassword)) {
      return { valid: false, error: "Password must contain a number" };
    }

    if (!/[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]/.test(trimmedPassword)) {
      return {
        valid: false,
        error: "Password must contain a special character (!@#$%^&* etc.)",
      };
    }

    return { valid: true, error: "" };
  }

  function handlePasswordInput(e) {
    const pwd = e.target.value;
    setPassword(pwd);

    if (pwd) {
      const validation = validatePasswordStrength(pwd);
      if (!validation.valid) {
        setPasswordError(validation.error);
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }

  function handleConfirmPasswordInput(e) {
    const conf = e.target.value;
    setConfPassword(conf);

    if (conf) {
      if (password !== conf) {
        setConfPasswordError("Passwords do not match");
      } else {
        setConfPasswordError("");
      }
    } else {
      setConfPasswordError("");
    }
  }

  function checkPasswordFinal() {
    const validation = validatePasswordStrength(password);
    if (!validation.valid) {
      setPasswordError(validation.error);
      passwordRef.current?.focus();
      return false;
    }

    if (!confPassword) {
      setConfPasswordError("Confirm password cannot be empty");
      confPasswordRef.current?.focus();
      return false;
    }

    if (password !== confPassword) {
      setConfPasswordError("Passwords do not match");
      confPasswordRef.current?.focus();
      return false;
    }

    setPasswordError("");
    setConfPasswordError("");
    return true;
  }

  function clearStates() {
    setName("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    setNameError("");
    setPasswordError("");
    setConfPasswordError("");
    setEmailError("");
  }

  async function handleSubmit() {
    // Final validation before submit
    if (!checkPasswordFinal()) {
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        password,
      });

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
      <div className="flex flex-col md:flex-row w-full min-h-full justify-center items-center bg-gradient-to-r from-[#BED3DC] to-[#CAD9D4] transition-all duration-500 md:gap-14 lg:gap-16">
        <div className="md:w-7/12 md:flex hidden justify-center items-center">
          <img src={people} alt="people" />
        </div>
        <div className="md:hidden flex justify-center items-center gap-2 pt-8">
          <img src={bag} alt="bag" className="w-10 mb-4" />
          <p className="text-2xl font-bold mb-4 text-gray-700">Welcome!</p>
        </div>

        <div className="flex justify-center items-center md:w-3/12 md:min-w-sm w-sm h-auto md:pr-6 py-8">
          <div className="flex flex-col justify-center items-center w-full max-w-md bg-white gap-4 rounded-2xl shadow-lg p-4">
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
                  className="text-cyan-800 cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </div>
            </div>

            {step === 1 && (
              <form
                className="flex flex-col gap-4 w-full items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const nameValid = validateName(name);
                      if (nameValid) {
                        emailRef.current?.focus();
                      }
                    }
                  }}
                  ref={nameRef}
                  className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
                  aria-label="Full name"
                  autoFocus
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
                    setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const nameValid = validateName(name);
                      if (nameValid) {
                        setStep(2);
                      }
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
                  onClick={() => {
                    const nameValid = validateName(name);
                    if (nameValid) {
                      setStep(2);
                    }
                  }}
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
              <form
                className="flex flex-col gap-4 w-full items-center"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="New Password"
                  onChange={handlePasswordInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (!passwordError) {
                        confPasswordRef.current?.focus();
                      }
                    }
                  }}
                  ref={passwordRef}
                  className="p-3 rounded-lg h-12 w-4/5 text-gray-500 bg-[#F7F7F7]"
                  aria-label="New password"
                  autoFocus
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
                  onChange={handleConfirmPasswordInput}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit();
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
                  onClick={handleSubmit}
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
