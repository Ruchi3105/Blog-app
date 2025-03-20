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
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div>
      <span>Login</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username:</label>
        <input
          className=""
          type="text"
          placeholder="Enter your username..."
          ref={userRef}
        />

        <label htmlFor="">Password:</label>
        <input
          className=""
          type="password"
          placeholder="Enter password..."
          ref={passwordRef}
        />

        <button className="" type="submit">
          Login
        </button>
      </form>
      <div>
        <span>Don't have an account? </span>
        <button className="">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </div>
  );
};

export default Login;
