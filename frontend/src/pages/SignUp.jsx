import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";

const Signup = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/sign-up",
        Values
      );
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <ErrorPage />
      ) : (
        <div className="h-screen bg-green-100 flex items-center justify-center">
          <ToastContainer position="top-center" pauseOnFocusLoss />
          <div className="w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center bg-black text-white p-6 rounded-md">
            <Link to="/" className="text-2xl font-bold">
              PODCASTER
            </Link>
            <div className="mt-6 w-full">
              <div className="w-full flex flex-col">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  className="mt-2 px-2 py-2 rounded text-black outline-none border border-black"
                  required
                  placeholder="Username"
                  name="username"
                  value={Values.username}
                  onChange={change}
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="mt-2 px-2 py-2 rounded text-black outline-none border border-black"
                  required
                  placeholder="Email"
                  name="email"
                  value={Values.email}
                  onChange={change}
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="mt-2 px-2 py-2 rounded text-black outline-none border border-black"
                  required
                  placeholder="Password"
                  name="password"
                  value={Values.password}
                  onChange={change}
                />
              </div>

              <div className="w-full flex flex-col mt-4">
                <button
                  className="bg-yellow-400 font-semibold text-xl text-black rounded py-2"
                  onClick={handleSubmit}
                >
                  SignUp
                </button>
              </div>

              <div className="text-center w-full flex flex-col mt-4">
                <Link to="/login" className="hover:text-blue-400">
                  <p>Already have an account ? Login</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </> 
  );
};

export default Signup;
