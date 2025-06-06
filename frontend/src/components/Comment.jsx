import React from "react";
import { ThumbsUp, ThumbsDown, Trash2 } from "lucide-react";
import axios from "axios";
import { Context } from "../../context/Context";
import { useContext } from "react";

const Comment = ({ comment, onUpdate, onDelete }) => {
  const { user } = useContext(Context);

  const handleLike = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${comment._id}/like`,
        {
          userId: user?.username,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        onUpdate(res.data.comment);
      }
    } catch (err) {
      console.error("Error liking comment:", err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${comment._id}/dislike`,
        {
          userId: user.username,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        onUpdate(res.data.comment);
      }
    } catch (err) {
      console.error("Error disliking comment", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${comment._id}/delete`,
        {
          withCredentials: true,
        }
      );
      onDelete(comment._id);
    } catch (err) {
      console.error("Error deleting comment", err);
    }
  };

  return (
    <div className="bg-white outline-1 rounded-2xl p-4 mb-4 flex flex-col sm:flex-row sm:items-start gap-4 transition-all">
      {/* Avatar & Username */}
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-sm">
          {comment.username.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-sm text-gray-800">
            {comment.username}
          </h4>
          {user?.username === comment.username && (
            <button onClick={handleDelete} title="Delete comment">
              <Trash2
                size={18}
                className="text-red-500 hover:text-red-600 transition"
              />
            </button>
          )}
        </div>

        <p className="text-sm text-gray-700 mt-1">
          {comment.comment}
        </p>

        <div className="flex items-center gap-4 mt-2 text-sm ">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 ${
              comment.likes.includes(user?.username)
                ? "text-green-500"
                : "hover:text-green-500"
            }`}
          >
            <ThumbsUp size={16} />
            {comment.likes.length}
          </button>

          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 ${
              comment.dislikes.includes(user?.username)
                ? "text-red-500"
                : "hover:text-red-500"
            }`}
          >
            <ThumbsDown size={16} />
            {comment.dislikes.length}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
