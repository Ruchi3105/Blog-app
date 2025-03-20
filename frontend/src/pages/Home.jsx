import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import Posts from "../components/Posts";
import { useLocation } from "react-router-dom";
import { Context } from "../../context/Context";

const Home = () => {
  const {user}=useContext(Context)
  const { search } = useLocation();
  // console.log(search)
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
    
      <Header />
      <div>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
