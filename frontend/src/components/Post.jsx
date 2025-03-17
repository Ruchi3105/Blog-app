import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const pf = "http://localhost:5000/images/";
  return (
    <div>
      {post.photo && <img src={pf + post.photo} alt="" />}
      <div>
        <div>
          {post.categories.map((c, i) => (
            <span key={i}>{c.name}</span>
          ))}
        </div>

        <div>
          <Link to={`/post/${post._id}`}>
            <span>{post.title}</span>
          </Link>
        </div>
        <hr />
        <span>{new Date(post.createdAt).toDateString()}</span>
        <p>{post.desc}</p>
      </div>
    </div>
  );
};

export default Post;
