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
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories`);
        setCategories(res.data);
      } catch (err) {
        console.log("Error fetching categories:", err.message);
      }
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(selectedFile.type)) {
        setError("Only JPG, JPEG, or PNG files are allowed.");
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }

      setFile(selectedFile);
      setError("");
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog-app-preset"); // Replace with your Cloudinary upload preset

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed. Try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (title.trim().length < 5) return setError("Title must be at least 5 characters long.");
    if (desc.trim().length < 20) return setError("Description must be at least 20 characters long.");
    if (!selectedCategory) return setError("Please select a category.");
  
    setError("");
    let imageUrl = "";

    if (file) {
      imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) return;
    }

    const newPost = {
      username: user.username,
      title,
      desc,
      categories: [selectedCategory],
      photo: imageUrl,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/posts/create`, newPost, {
        withCredentials: true,
      });
      navigate("/post/" + res.data._id);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
      console.log("Post creation error:", err);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gray-200 top-14 relative overflow-x-hidden">
      <div className="w-full max-w-screen-lg rounded-lg flex flex-col items-center space-y-6 px-6 py-7">
        <h2 className="mb-4 text-2xl font-semibold">Create a New Post</h2>

        {file && <img src={URL.createObjectURL(file)} alt="Preview" className="w-full max-h-80 object-cover rounded-lg" />}
        {error && <div className="text-red-500 font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          {/* File Upload Input */}
          <div className="flex items-center gap-4">
            <label htmlFor="fileInput" className="cursor-pointer text-blue-600 hover:text-slate-950 transition">
              <CirclePlus size={32} />
            </label>
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
            <input
              type="text"
              placeholder="Enter title..."
              className="flex-1 border-b-2 border-blue-600 focus:border-slate-950 outline-none p-2 text-lg w-full"
              autoFocus
              value={title}
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
            className="w-full min-h-[300px] p-3 border border-blue-600 focus:ring-2 focus:ring-slate-950 outline-none resize-none rounded-lg"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          {/* Publish Button */}
          <button type="submit" className="w-20 bg-blue-500 text-white rounded-lg py-1 px-3 hover:bg-blue-700 transition-all self-end">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
