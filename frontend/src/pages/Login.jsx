import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const validateInput = () => {
    if (!username.trim()) return "Username is required.";
    if (!password) return "Password is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateInput();
    if (validationError) {
      return setError(validationError);
    }

    dispatch({ type: "LOGIN_START" });
    try {
      await axios.post(
        "/api/auth/login",
        {
          username: username.trim(),
          password: password,
        },
        { withCredentials: true }
      );

      const res = await axios.get("/api/auth/me", {
        withCredentials: true,
      });

      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.user });
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password.");
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="bg-[url('https://wallpapercave.com/wp/wp14129828.jpg')] min-h-screen bg-cover bg-center bg-no-repeat bg-fixed w-screen">
      <div className="bg-black/60 h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white/60 gap-5 rounded-lg px-4 py-7  sm:w-[50%] w-[70%] md:w-[40%] lg:w-[30%]">
          <span className="text-2xl mt-2 mb-2">Login</span>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center gap-5 w-full px-3"
          >
            <input
              className="outline-0 px-2 py-1 rounded bg-white/70 w-full placeholder:text-gray-400"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />

            <input
              className="outline-0 px-2 py-1 rounded bg-white/70 w-full placeholder:text-gray-400"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-cyan-800 px-3 py-1 w-full text rounded-2xl text-white hover:bg-cyan-700"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? "Logging in..." : "Login"}
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
