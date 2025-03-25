import React from "react";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <div className="min-h-screen bg-gray-100 w-screen p-6">
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {posts.map((post, index) => (
            <Post key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
