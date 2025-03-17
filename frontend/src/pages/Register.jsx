import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <label htmlFor="">Username:</label>
        <input
          className=""
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username..."
        />

        <label htmlFor="">Email:</label>
        <input
          className=""
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
        />

        <label htmlFor="">Password:</label>
        <input
          className=""
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
        />

        <button className="" type="submit">
          Register
        </button>
      </form>
      <div>
        <span>Already have an account? </span>
        <button className="">
          {" "}
          <Link to="/login">Login</Link>
        </button>
      </div>
      {error ? <p>something went wrong</p> : ""}
    </div>
  );
};

export default Register;
