import React from "react";

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
          <p className="text-white">Start Your Blogging Journey Today!</p>
          <div></div>
          <button className="h-8 w-28 text-sm px-4 py-3 font-mono rounded-md bg-transparent border-2 border-white text-white transition-all duration-300 hover:scale-103">
            Explore Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
