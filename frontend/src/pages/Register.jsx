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
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="bg-[url('https://images5.alphacoders.com/421/421870.jpg')] min-h-screen bg-cover bg-center bg-no-repeat bg-fixed w-screen">
      <div className="bg-black/60 h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-white/70 px-4 py-7 sm:w-[55%] w-[90%] md:w-[45%] lg:w-[35%] gap-5 rounded-lg">
          <h1 className="text-2xl mb-2 mt-2">Create Account</h1>
          <form
            onSubmit={handleRegister}
            className="flex flex-col justify-center items-center gap-5 w-full "
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
              className="bg-cyan-800 px-3 py-1 mt-2 w-[70%] text rounded-2xl text-white hover:bg-cyan-700 cursor-pointer"
              type="submit"
            >
              Create Account
            </button>
          </form>
          <div className="text-sm">
            <span>Already have an account? </span>
            <button className="text-blue-800 underline">
              {" "}
              <Link to="/login">Login</Link>
            </button>
          </div>
          {success && (
            <p className="text-green-500 text-sm">
              Registration successful! Redirecting...
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
