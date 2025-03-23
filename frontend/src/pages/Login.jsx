import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });
    try {
      await axios.post(
        "/api/auth/login",
        {
          username: userRef.current.value,
          password: passwordRef.current.value,
        },
        { withCredentials: true }
      );

      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      navigate("/blogs");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="bg-[url('https://wallpapercave.com/wp/wp14129828.jpg')] min-h-screen bg-cover bg-center bg-no-repeat bg-fixed w-screen">
      <div className="bg-black/60 h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white/60 gap-5 rounded-lg px-4 py-7  sm:w-[50%] w-[70%] md:w-[40%] lg:w-[30%]">
          <span className="text-2xl mt-2 mb-2">Login</span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center gap-5 w-full px-3"
          >
            <input
              className="outline-0 px-2 py-1 rounded bg-white/70 w-full placeholder:text-gray-400"
              type="text"
              placeholder="Enter your username"
              ref={userRef}
            />

            <input
              className="outline-0 px-2 py-1 rounded bg-white/70 w-full placeholder:text-gray-400"
              type="password"
              placeholder="Enter password"
              ref={passwordRef}
            />

            <button
              className="bg-cyan-800 px-3 py-1 w-full text rounded-2xl text-white hover:bg-cyan-700"
              type="submit"
            >
              Login
            </button>
          </form>
          <div className="text-sm">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-800 underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
