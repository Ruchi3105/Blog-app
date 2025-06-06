import axios from "axios";
import { SquarePen, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import CommentList from "./CommentList";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/posts/${path}`
        );
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${post._id}`,
        {
          data: { username: user.username },
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleUpdate = async () => {
    if (!title.trim() || !desc.trim()) {
      alert("Title and description cannot be empty!");
      return;
    }

    setUpdating(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${post._id}`,
        {
          username: user.username,
          title: title.trim(),
          desc: desc.trim(),
        },
        { withCredentials: true }
      );
      setUpdateMode(false);
      setPost((prev) => ({ ...prev, title, desc }));
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="w-full px-4 flex items-center flex-col">
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] mx-auto p-8 bg-white shadow-lg rounded-3xl mt-20 border border-gray-200">
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading post...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-lg font-medium">{error}</p>
        ) : (
          <>
            {post.photo && (
              <img
                src={post.photo}
                alt="Post"
                className="w-full h-[20rem] object-cover rounded-xl mb-6 shadow-sm"
              />
            )}

            <div className="flex flex-wrap items-center justify-between text-sm text-gray-500 mb-4">
              <Link to={`/blogs/?users=${post.username}`} className="hover:text-indigo-600">
                Author: <span className="font-semibold text-gray-700">{post.username}</span>
              </Link>
              <span>{new Date(post.createdAt).toDateString()}</span>
            </div>

            <div className="flex justify-between items-center mb-6">
              {updateMode ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                  className="w-full text-2xl font-bold border-b-2 border-indigo-500 outline-none p-2 text-gray-800"
                />
              ) : (
                <h1 className="text-3xl font-bold text-gray-900 leading-snug">{title}</h1>
              )}

              {post.username === user?.username && (
                <div className="flex gap-3 ml-4">
                  <SquarePen
                    className="text-indigo-600 cursor-pointer hover:scale-110 transition-transform"
                    size={24}
                    onClick={() => setUpdateMode(true)}
                  />
                  <Trash
                    className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                    size={24}
                    onClick={() => setShowDeleteConfirm(true)}
                  />
                </div>
              )}
            </div>

            <hr className="border-gray-300 mb-6" />

            <div className="text-gray-800 text-[1.05rem] leading-7">
              {updateMode ? (
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  rows={10}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              ) : (
                <p className="whitespace-pre-wrap text-justify">{desc}</p>
              )}
            </div>

            {updateMode && (
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setUpdateMode(false)}
                  className="px-5 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                  disabled={updating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className={`px-5 py-2 rounded-md text-white transition font-medium text-sm ${
                    updating
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {!loading && post._id && <CommentList postId={post._id} />}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-bold mb-3 text-gray-800">Are you sure?</h2>
            <p className="text-gray-600 mb-6 text-sm">
              This action will permanently delete your post.
            </p>
            <div className="flex justify-evenly">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  handleDelete();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
