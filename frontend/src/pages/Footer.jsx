import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-10 pb-6 px-6 md:px-20 w-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-screen-xl mx-auto gap-8">

        {/* About Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">NeuraBlog</h2>
          <p className="text-sm text-gray-400">
            NeuraBlog is your go-to platform to explore, share, and engage with insightful content on tech, lifestyle, education, and more. Crafted for curious minds.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/blogs" className="hover:underline">All Blogs</Link></li>
            <li><Link to="/write" className="hover:underline">Write</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Connect with Us</h2>
          <div className="flex space-x-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Github />
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Linkedin />
            </a>
            <a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} NeuraBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
