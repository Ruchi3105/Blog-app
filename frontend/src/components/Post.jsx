import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User2 } from "lucide-react";

const Post = ({ post }) => {
  const imageUrl = post.photo?.startsWith("http")
    ? post.photo
    : "https://source.unsplash.com/featured/?blog,tech";

  const authorName = post.username || "Guest Author";
  const postDate = new Date(post.createdAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-md w-full bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={imageUrl}
          alt="Post Cover"
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <User2 className="w-4 h-4" />
            <span>{authorName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{postDate}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 hover:text-indigo-700 transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-gray-600 font-light mb-4 line-clamp-3">
          {post.summary}
        </p>

        <Link
          to={`/post/${post._id}`}
          className="mt-auto w-full inline-block text-center bg-indigo-700 text-white font-medium py-2.5 rounded-xl text-sm hover:bg-indigo-800 transition-all duration-300 shadow-sm"
        >
          Read Article →
        </Link>
      </div>
    </div>
  );
};

export default Post;
