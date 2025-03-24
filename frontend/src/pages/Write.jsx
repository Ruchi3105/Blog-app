import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import axios from "axios";

const Write = () => {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Trim and validate input fields
    if (title.trim().length < 5) {
      return setError("Title must be at least 5 characters long.");
    }
    if (desc.trim().length < 20) {
      return setError("Description must be at least 20 characters long.");
    }
    if (!selectedCategory) {
      return setError("Please select a category.");
    }

    setError("");
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: [selectedCategory],
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/api/posts/create", newPost);
      navigate("/post/" + res.data._id);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gray-200 top-14 relative  overflow-x-hidden">
      {/* MAIN CONTENT */}
      <div className=" w-full max-w-screen-lg  rounded-lg flex flex-col items-center space-y-6 px-6 py-7 ">
        {/* HEADER */}
        <div className="mb-4 text-2xl font-semibold">Create a New Post</div>
        {/* IMAGE PREVIEW */}
        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Selected"
            className="w-full max-h-80 object-cover rounded-lg"
          />
        )}

        {error && <div className="text-red-500 font-semibold">{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* File Upload Input */}
          <div className="flex items-center gap-4">
            <label
              htmlFor="fileInput"
              className="cursor-pointer text-blue-600 hover:text-slate-950 transition"
            >
              <CirclePlus size={32} />
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Enter title..."
              className="flex-1 border-b-2 border-blue-600 focus:border-slate-950 outline-none p-2 text-lg w-full"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Category Selection */}
          <select
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Story Input */}
          <textarea
            placeholder="Tell your story..."
            className="w-full min-h-[500px] p-3 border border-blue-600 focus:border-0 rounded-lg focus:ring-2 focus:ring-slate-950 outline-none resize-none"
            onChange={(e) => setDesc(e.target.value)}
            autoFocus
          ></textarea>

          {/* Publish Button */}
          <button
            type="submit"
            className="w-20 bg-blue-500 text-white rounded-lg py-1 px-3 hover:bg-blue-700 transition-all self-end"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
