import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({});
  const pf = "http://localhost:5000/images/";

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      setPost(res.data);
    };
    fetchPost();
  }, [path]);

  return (
    <div>
      <h1>{post.title}</h1>
      <div>{post.photo && <img src={pf + post.photo} alt="" />}</div>
      <Link to={`/?users=${post.username}`}>
        <span>{post.username}</span>
      </Link>

      <div>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <hr />
      <div>
        <p>{post.desc}</p>
      </div>
    </div>
  );
};

export default SinglePost;
