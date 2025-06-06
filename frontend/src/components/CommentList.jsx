import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import { Context } from "../../context/Context";
import { useContext } from "react";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(Context);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/posts/${postId}/comments`
        );

        setComments(res.data);
      } catch (err) {
        console.log("Error fetching comments:", err.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleDelete = (commentId) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  const handleUpdate = (updatedComment) => {
    setComments((prev) =>
      prev.map((c) => (c._id === updatedComment._id ? updatedComment : c))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/posts/${postId}/create-comment`,
        {
          comment: newComment,
          username: user.username,
        },
        {
          withCredentials: true,
        }
      );
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
    } catch (err) {
      console.log("Error adding comment:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 w-full max-w-3xl mx-auto px-4 mb-8">
      {/* Comment Form */}
      {user ? (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-white  shadow-md rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
        >
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="flex-1 w-full sm:w-auto resize-none border border-gray-300  rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 "
            rows={2}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-700 text-white text-sm rounded-md hover:bg-indigo-800 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      ) : (
        <p className="text-sm text-gray-500 mb-4">
          Please log in to add a comment.
        </p>
      )}

      {/* Comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
};

export default CommentList;
