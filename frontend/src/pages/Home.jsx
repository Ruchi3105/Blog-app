import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Posts from "../components/Posts";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { Search } from "lucide-react";

const Home = () => {
  const { user } = useContext(Context);
  const { search } = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState([]);

  const categoryParam = new URLSearchParams(search).get("cat");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/posts${search}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories`);
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleCategoryClick = (catName) => {
    if (catName === "All") navigate("/blogs");
    else navigate(`/blogs?cat=${catName}`);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-indigo-100/50 overflow-x-hidden w-screen">
      {/* Content Container */}
      <div className="flex flex-col justify-center items-center pt-20 px-4 sm:px-8 md:px-16 max-w-screen-xl mx-auto">

        {/* Hero Section */}
        <section className="text-center mb-8 mt-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            Welcome to <span className="text-indigo-600">NeuraBlog</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover powerful stories, thoughtful ideas, and creative voices. Whether you're a reader or a writer, there's something here for you.
          </p>
        </section>

        {/* Search Box */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md w-full max-w-md">
            <input
              type="text"
              placeholder="Search blogs..."
              value={query}
              onChange={handleSearch}
              className="flex-grow outline-none bg-transparent text-sm"
            />
            <Search className="text-gray-500" />
          </div>
        </div>

        {/* Category Scroll Bar */}
        <div className="w-full overflow-x-auto hide-scrollbar mb-8">
          <div className="flex space-x-3 min-w-max px-1 sm:px-0">
            <button
              onClick={() => handleCategoryClick("All")}
              className={`px-4 py-2 rounded-full text-sm border transition whitespace-nowrap pb-3 ${
                !categoryParam
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => handleCategoryClick(category.name)}
                className={`px-4 py-2 rounded-full text-sm border transition whitespace-nowrap ${
                  categoryParam === category.name
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Posts */}
        <div>
          {filteredPosts.length > 0 ? (
            <Posts posts={filteredPosts} />
          ) : (
            <p className="text-gray-500 text-center">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
