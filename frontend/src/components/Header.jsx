import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-[url('https://4kwallpapers.com/images/wallpapers/baros-maldives-island-seascape-tropical-beach-blue-sky-3840x2160-4325.jpg')] h-screen bg-cover bg-center bg-no-repeat bg-fixed w-screen">
      <div className="bg-black/50 h-screen">
        <div className="h-full flex flex-col justify-center items-center z-50 gap-3">
          <div className="w-[90%]">
            <h3 className="text-2xl text-white text-center">
              Every Thought is a Story, Every Story is Worth Sharing.
            </h3>
          </div>
          <p className="text-white text-center">
            Start Your Blogging Journey Today!
          </p>

          <Link
            className="px-2 py-1 text-sm font-mono mt-4 rounded-md bg-transparent border-2 border-white text-white transition-all duration-300 hover:scale-103"
            to={"/blogs"}
          >
            Explore Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
