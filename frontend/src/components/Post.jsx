import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const pf = "http://localhost:5000/images/";
  return (
    <div className="cursor-pointer group relative flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-80 hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img
          className="transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
          src={pf + post.photo}
          alt=""
        />
      </div>

      {/* <div>
        {post.categories.map((c, i) => (
          <span key={i}>{c.name}</span>
        ))}
      </div> */}

      <div className="px-4 py-3">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
          {post.title}
        </h6>
        <p className="text-slate-600 leading-normal font-light">
          {post.desc.split(" ").length > 20
            ? post.desc.split(" ").slice(0, 20).join(" ") + "..."
            : post.desc}
        </p>
      </div>
      <div className="px-4 text-sm text-slate-400 self-end">
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      <div className="px-4 pb-6 pt-0 mt-2">
        <Link
          to={`/post/${post._id}`}
          className="rounded-md bg-slate-800 py-2.5 px-3.5 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Read article
        </Link>
      </div>
    </div>
  );
};

export default Post;
