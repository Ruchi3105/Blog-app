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
  const PF = "http://localhost:5000/images/";

  useEffect(() => {
    if (user?.profilePic) {
      setProfilePic(PF + user.profilePic);
    } else {
      setProfilePic(PF + "defaultProfile.jpg");
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
    <div className="w-screen bg-black/40 backdrop-blur-xl h-14 fixed top-0 flex items-center justify-center shadow-lg z-40">
      <div className="z-50 top-0 w-[80%] flex gap-7 justify-between text-blue-100 text-sm items-center">
        <Link className="flex gap-0.5 justify-center items-center cursor-pointer" to="/">
          <span>
          <img className="h-7" src="/icons8-n-64.png" alt="" />
          </span>
          <span className="text-xl font-bold text-blue-100">euraBlog</span>
        </Link>
        <div className="hidden md:flex gap-5 text-blue-100 text-sm items-center">
          <ul className="flex gap-5">
            <li className="hover:text-white">
              <Link className="" to="/home">
                HOME
              </Link>
            </li>
            <li className="">
              <Link className="hover:text-white" to="/about">
                ABOUT
              </Link>
            </li>
            <li className="">
              <Link className="hover:text-white" to="/blogs">
                ALL BLOGS
              </Link>
            </li>
            {user && (
              <li className="">
                <Link className="hover:text-white" to="/write">
                  WRITE
                </Link>
              </li>
            )}
            <li
              className="hover:text-white cursor-pointer"
              onClick={handleLogout}
            >
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <Link to="/settings">
              <img className="w-10 h-10 rounded-full" src={profilePic} alt="Profile" />
            </Link>
          ) : (
            <ul className="flex gap-7">
              <button className="">
                <Link className="hover:text-white " to="/login">
                  LOGIN
                </Link>
              </button>
              <li className="=">
                <Link className="hover:text-white" to="/register">
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
              <div className="absolute right-5 w-32 bg-black text-white shadow-lg rounded-lg p-4 transition-all backdrop-blur-xl">
                <div className="absolute -top-2 right-4 w-4 h-4 bg-black/40 rotate-45 overflow-hidden backdrop-blur-xl"></div>
                <ul className="flex flex-col gap-2 text-center justify-center items-center">
                  <Link
                    className="hover:text-gray-300"
                    to="/home"
                    onClick={() => setMenuOpen(false)}
                  >
                    HOME
                  </Link>
                  <Link
                    className="hover:text-gray-300"
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                  >
                    ABOUT
                  </Link>
                  <Link
                    className="hover:text-gray-300"
                    to="/blogs"
                    onClick={() => setMenuOpen(false)}
                  >
                    ALL BLOGS
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

                  <li
                    className="hover:text-gray-300 cursor-pointer"
                    onClick={handleLogout}
                  >
                    {user && "LOGOUT"}
                  </li>

                  {user ? (
                    <Link to="/settings" onClick={() => setMenuOpen(false)}>
                      <img
                        className="w-10 h-10 rounded-full"
                        src={profilePic}
                        alt="Profile"
                      />
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-2 -mt-1">
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
