import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Posts from "../components/Posts";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
import { Search } from "lucide-react";

const Home = () => {
  const { user } = useContext(Context);
  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
      setFilteredPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setQuery(searchQuery);

    if (searchQuery === "") {
      setFilteredPosts(posts);
    } else {
      const matchedPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery)
      );
      setFilteredPosts(matchedPosts);
    }
  };
  return (
    <div className="bg-slate-100 w-screen">
      <div className="relative top-14 mt-5 bg-gray-100 w-screen h-screen">
        <div>
          <div className="flex items-center justify-center">
            <div className="w-70 flex justify-center items-center border border-slate-950 rounded px-3 py-1 focus-within:border-blue-600 ">
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearch}
                className="placeholder:font-light outline-0 w-full "
              />
              <Search className="text-gray-500 " />
            </div>
          </div>

          {filteredPosts.length > 0 ? (
            <Posts posts={filteredPosts} />
          ) : (
            <p className="mx-10">No blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
