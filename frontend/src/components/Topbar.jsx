import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [profilePic, setProfilePic] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (user?.profilePic) {
      setProfilePic(
        user.profilePic.startsWith("http")
          ? user.profilePic
          : "https://res.cloudinary.com/dhaxasdsk/image/upload/v1743003229/defaultProfile_faeqba.jpg"
      );
    } else {
      setProfilePic(
        "https://res.cloudinary.com/dhaxasdsk/image/upload/v1743003229/defaultProfile_faeqba.jpg"
      );
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGOUT" });
      setMenuOpen(false);
    } catch (err) {
      console.log("Logout failed", err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full fixed top-0 z-50 backdrop-blur-md bg-gradient-to-r from-black/60 via-indigo-950/60 to-black/60 shadow-[0_0_20px_rgba(109,40,217,0.2)] h-16 flex items-center justify-center border-b border-indigo-900/50">
      <div className="z-50 top-0 w-[80%] flex gap-7 justify-between text-blue-100 text-sm items-center">
        <Link className="flex gap-1 items-center" to="/">
          <img className="h-7" src="/icons8-n-64.png" alt="Logo" />
          <span className="text-xl font-extrabold tracking-tight text-indigo-100 hover:text-white transition">
            euraBlog
          </span>
        </Link>

        <div className="hidden md:flex gap-5 text-blue-100 text-sm items-center">
          <ul className="flex gap-6 font-medium text-indigo-100 text-sm">
            <li className="hover:text-white transition">
              <Link to="/blogs">HOME</Link>
            </li>

            <li className="hover:text-white transition">
              <Link to="/home">CATEGORIES</Link>
            </li>
            {user && (
              <li className="hover:text-white transition">
                <Link to="/write">WRITE</Link>
              </li>
            )}

            <li className="hover:text-white transition">
              <Link to="/about">ABOUT</Link>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/settings">
                <img
                  className="w-10 h-10 rounded-full border border-indigo-400 hover:scale-105 transition"
                  src={profilePic}
                  alt="Profile"
                />
              </Link>
              <ul className="flex gap-6 font-medium text-indigo-100 text-sm">
                <li
                  className="hover:text-red-300 transition cursor-pointer"
                  onClick={handleLogout}
                >
                  LOGOUT
                </li>
              </ul>
            </div>
          ) : (
            <ul className="flex gap-6 text-indigo-100 font-medium">
              <li>
                <Link className="hover:text-white transition" to="/login">
                  LOGIN
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white cursor-pointer"
          >
            <motion.div
              key={menuOpen ? "close" : "menu"}
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.div>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 right-5 bg-black/60 text-white shadow-lg rounded-lg backdrop-blur-xl"
            >
              <div className="absolute right-5 w-32 bg-black text-white shadow-lg rounded-lg p-4">
                <div className="absolute -top-2 right-4 w-4 h-4 bg-black/40 rotate-45"></div>
                <ul className="flex flex-col gap-2 text-center">
                  <Link
                    className="hover:text-gray-300"
                    to="/blogs"
                    onClick={() => setMenuOpen(false)}
                  >
                    HOME
                  </Link>

                  <Link
                    className="hover:text-gray-300"
                    to="/home"
                    onClick={() => setMenuOpen(false)}
                  >
                    CATEGORIES
                  </Link>
                  {user && (
                    <Link
                      className="hover:text-gray-300"
                      to="/write"
                      onClick={() => setMenuOpen(false)}
                    >
                      WRITE
                    </Link>
                  )}
                  <Link
                    className="hover:text-gray-300"
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                  >
                    ABOUT
                  </Link>

                  {user ? (
                    <div>
                      <Link
                        to="/settings"
                        onClick={() => setMenuOpen(false)}
                        className="flex justify-center items-center"
                      >
                        <img
                          className="w-10 h-10 rounded-full "
                          src={profilePic}
                          alt="Profile"
                        />
                      </Link>
                      <ul className="flex flex-col gap-2 text-center mt-3">
                        <li
                          className="hover:text-gray-300 cursor-pointer"
                          onClick={handleLogout}
                        >
                          LOGOUT
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 -mt-0.01">
                      <Link
                        className="hover:text-white hover:bg-black/30 rounded"
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                      >
                        LOGIN
                      </Link>
                      <Link
                        className="hover:text-white hover:bg-black/30"
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                      >
                        REGISTER
                      </Link>
                    </div>
                  )}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
