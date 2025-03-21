import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const [menuOpen, setMenuOpen] = useState(false);
  const PF = "http://localhost:5000/images/";

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({ type: "LOGOUT" });
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
    <div className="w-screen bg-slate-600/40 h-14 fixed top-0 flex items-center justify-center shadow-2xl">
      <div className="z-50 top-0 w-[80%] flex gap-7 justify-between text-blue-100 text-sm items-center">
        <Link className="flex gap-3 justify-center cursor-pointer" to="/home">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2" // ✅ Corrected
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-slack" // ✅ Use "className" instead of "class"
            >
              <rect width="3" height="8" x="13" y="2" rx="1.5" />
              <path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" />
              <rect width="3" height="8" x="8" y="14" rx="1.5" />
              <path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" />
              <rect width="8" height="3" x="14" y="13" rx="1.5" />
              <path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" />
              <rect width="8" height="3" x="2" y="8" rx="1.5" />
              <path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" />
            </svg>
          </span>
          <span className="text-xl font-bold text-white">NeruaBlog</span>
        </Link>
        <div className="hidden md:flex gap-5 text-blue-100 text-sm items-center">
          <ul className="flex gap-5">
            <li className="hover:text-white">
              <Link className="" to="/">
                HOME
              </Link>
            </li>
            <li className="">
              <Link className="hover:text-white" to="/">
                ABOUT
              </Link>
            </li>
            <li className="">
              <Link className="hover:text-white" to="/">
                CONTACT
              </Link>
            </li>
            <li className="">
              <Link className="hover:text-white" to="/write">
                WRITE
              </Link>
            </li>
            <li className="hover:text-white" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <Link to="/settings">
              <img
                className="w-10 h-10 rounded-full"
                src={PF + user.profilePic}
                alt="Profile"
              />
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
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
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
              className="absolute top-16 right-5 w-40 bg-slate-600/90 text-white shadow-lg rounded-lg p-4"
            >
              <div className="absolute right-5 w-32 bg-slate-600/40 text-white shadow-lg rounded-lg p-4 transition-all ">
                <div className="absolute -top-2 right-4 w-4 h-4 bg-slate-600/40 rotate-45 overflow-hidden"></div>
                <ul className="flex flex-col gap-4 text-center">
                  <div></div>
                  <Link className="hover:text-gray-300" to="/">
                    HOME
                  </Link>
                  <Link className="hover:text-gray-300" to="/">
                    ABOUT
                  </Link>
                  <Link className="hover:text-gray-300" to="/">
                    CONTACT
                  </Link>
                  <Link className="hover:text-gray-300" to="/write">
                    WRITE
                  </Link>

                  {user ? (
                    <Link to="/settings">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={PF + user.profilePic}
                        alt="Profile"
                      />
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        className="hover:text-white hover:bg-black/30 rounded"
                        to="/login"
                      >
                        LOGIN
                      </Link>
                      <Link
                        className="hover:text-white hover:bg-black/30"
                        to="/register"
                      >
                        REGISTER
                      </Link>
                    </div>
                  )}
                  <div></div>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
