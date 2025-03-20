import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    try {
      const res = await axios.post(
        "/api/auth/register",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data) {
        setSuccess(true);
        navigate('/login')
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
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
          required
        />

        <label htmlFor="">Email:</label>
        <input
          className=""
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          required
        />

        <label htmlFor="">Password:</label>
        <input
          className=""
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          required
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
      {success && (
        <p style={{ color: "green" }}>
          Registration successful! Redirecting...
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Register;
