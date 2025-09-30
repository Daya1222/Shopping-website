import { useState } from "react";
import arrow from "../assets/vector-arrow.png";
import google from "../assets/google.svg";
import logo from "../assets/social.png";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen">
      <div className="flex w-[100%] h-1/12 bg-white items-center ">
        <div className="cursor-pointer flex items-center">
          <img src={logo} alt="logo.png" className="w-10 ml-4 mr-1" />
          <div className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 drop-shadow-xl">
            QuickCart
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-gradient-to-r from-[#BED3DC] to-[#CAD9D4] w-[100%] h-11/12">
        <div className="flex justify-center  items-center flex-col w-[90%] h-[60%] max-w-[500px] bg-white gap-6  rounded-2xl">
          <div className=" flex flex-row justify-center items-center">
            <div className="flex h-[20%] w-[100%] flex-col justify-center items-center">
              <div className="text-[#414141] text-3xl font-bold">Log in to</div>
              <div>
                <span className="text-[#414141] text-3xl font-bold">your </span>
                <span className="bg-gradient-to-r from-[#C0E1F2] to-[#99E0C9] text-transparent bg-clip-text text-3xl font-bold">
                  ɑccount
                </span>
              </div>
              <div className="text-[#414141] text-[15px]">
                Don't have an account?{" "}
                <a href="" className="text-cyan-800">
                  Sign up
                </a>
              </div>
            </div>
            <div className="w-[60px]  ">
              <img src={arrow} alt="" />
            </div>
          </div>

          <form className="flex h-[70%] w-[100%] flex-col gap-4 justify-center items-center">
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-3  rounded-[8px] h-12 w-[80%]  text-[#9A9A9A] text-1xl  bg-[#F7F7F7] "
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
              className="p-3  rounded-[8px] h-12 w-[80%]  text-[#9A9A9A] text-1xl  bg-[#F7F7F7] "
            />

            <button
              type="submit"
              className=" flex justify-center items-center bg-[#414141] p-3 rounded-[8px] h-12 w-[80%] text-1xl cursor-pointer
              hover:bg-gradient-to-r hover:from-[#C0E1F2] hover:to-[#99E0C9]
  hover:text-[#414141] transition"
            >
              Log In →
            </button>
            <div className="text-[#005F78]">
              <a href="">Forgot password?</a>
            </div>
            <div className="flex items-center w-full my-0">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-2 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 w-[80%] h-12 
             p-3 text-1xl text-[#414141] bg-[#F7F7F7] rounded-2xl 
             hover:bg-[#E5E5E5] transition cursor-pointer"
            >
              <img src={google} alt="google logo" className="h-8 " />
              <span>Sign in with Google</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
