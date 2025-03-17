import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] lg:w-[70%] bg-slate-800 backdrop-blur-md shadow-lg rounded-full z-50 transition-all border border-white/10 px-6 h-20">
      <div className="flex justify-around items-center  relative text-white top-5 ">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          MyBrand
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menu Items */}
        <ul
          className={`absolute md:relative top-14 md:top-0 left-0 w-full md:w-auto bg-slate-800 md:bg-transparent backdrop-blur-md rounded-xl shadow-xl md:shadow-none 
                      md:flex md:space-x-8 text-lg transition-all transform gap-6 ${
                        isOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 md:opacity-100 md:scale-100"
                      } md:static`}
        >
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item} className="px-6 py-3 md:px-4 hover:bg-white/10 rounded-lg transition">
              <Link to={`/${item.toLowerCase()}`} className="text-white">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
