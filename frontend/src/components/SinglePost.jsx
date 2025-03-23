import axios from "axios";
import { SquarePen, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [post, setPost] = useState({});
  const pf = "http://localhost:5000/images/";

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fetchPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `/api/posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        },
        { withCredentials: true }
      );
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen flex items-center">
      <div className="w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto p-6 bg-white shadow-lg rounded-lg mt-20">
        {/* Post Image */}
        {post.photo && (
          <img
            src={pf + post.photo}
            alt="Post"
            className="w-full h-80 object-cover rounded-md mb-6"
          />
        )}

        {/* Author & Date */}
        
        <div className="flex items-center justify-between text-gray-600 text-lg capitalize mb-4">
          <Link to={`/blogs/?users=${post.username}`} className="">
            <span>Author: </span><span className="font-semibold hover:text-blue-600">{post.username}</span>
          </Link>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>

        {/* Title & Actions */}
        <div className="flex justify-between items-center mb-4">
          {updateMode ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="w-full text-2xl font-semibold border-b-2 border-blue-500 outline-none p-1"
            />
          ) : (
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          )}

          {post.username === user?.username && (
            <div className="flex gap-3">
              <SquarePen
                className="text-blue-600 cursor-pointer hover:scale-110 transition-all"
                size={24}
                onClick={() => setUpdateMode(true)}
              />
              <Trash
                className="text-red-600 cursor-pointer hover:scale-110 transition-all"
                size={24}
                onClick={handleDelete}
              />
            </div>
          )}
        </div>

        <hr className="border-gray-300 my-4" />

        {/* Description */}
        <div className="text-gray-700 text-lg leading-7 text-justify">
          {updateMode ? (
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              autoFocus rows={10}
              className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            ></textarea>
          ) : (
            <p>{desc}</p>
          )}
        </div>

        {/* Buttons */}
        {updateMode && (
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={() => setUpdateMode(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
