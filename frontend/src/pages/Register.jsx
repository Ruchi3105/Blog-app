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

  const validateInput = () => {
    if (username.trim().length < 3) {
      return "Username must be at least 3 characters long.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validateInput();
    if (validationError) {
      return setError(validationError);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data) {
        setSuccess(true);
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="bg-[url('https://applescoop.org/image/wallpapers/mac/12165082296265337-64964762781867179.jpg')] min-h-screen bg-cover bg-center bg-no-repeat bg-fixed w-screen">
      <div className="bg-black/60 h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white/70 px-4 py-7 sm:w-[55%] w-[98%] md:w-[45%] lg:w-[35%] gap-5 rounded-lg">
          <h1 className="text-2xl mb-2 mt-2">Create Account</h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">
              Registration successful! Redirecting...
            </p>
          )}
          <form
            onSubmit={handleRegister}
            className="flex flex-col justify-center items-center gap-5 w-full"
          >
            <div className="flex gap-4 justify-center items-center w-full">
              <label htmlFor="">Username:</label>
              <input
                className="outline-0 border-b-1 px-2  placeholder:text-sm"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="flex gap-4 justify-center items-center ">
              <label htmlFor="">E-mail:</label>
              <input
                className="outline-0 border-b-1 px-2  placeholder:text-sm"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex gap-4 justify-center items-center">
              <label htmlFor="">Password:</label>
              <input
                className="outline-0 border-b-1 px-2  placeholder:text-sm"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              className="bg-slate-900 px-3 py-1 mt-2 w-[70%] text rounded-2xl text-white hover:bg-slate-950 cursor-pointer"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <div className="text-sm">
            <span>Already have an account? </span>
            
              <Link to="/login" className="text-blue-800 underline">Login</Link>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
