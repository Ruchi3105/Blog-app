// Write.jsx
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PexelsModal from "./PexelsModal";

const Write = () => {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [imageSource, setImageSource] = useState("local");
  const [pexelsImage, setPexelsImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [showPexelsModal, setShowPexelsModal] = useState(false);

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

  const handleAddCategory = () => {
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories((prev) => [...prev, selectedCategory]);
    }
    setSelectedCategory("");
  };

  const handleRemoveCategory = (name) => {
    setSelectedCategories((prev) => prev.filter((cat) => cat !== name));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(selectedFile.type)) return setError("Only JPG, JPEG, or PNG files allowed.");
      if (selectedFile.size > 5 * 1024 * 1024) return setError("File must be <5MB");
      setFile(selectedFile);
      setPexelsImage(null);
      setError("");
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog-app-preset");
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
      return res.data.secure_url;
    } catch (err) {
      console.error("Image upload failed:", err);
      setError("Image upload failed. Try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 5) return setError("Title must be at least 5 characters.");
    if (desc.trim().length < 20) return setError("Description must be at least 20 characters.");
    if (selectedCategories.length === 0) return setError("Please select a category.");

    setError("");
    let imageUrl = "";

    if (file) imageUrl = await uploadToCloudinary(file);
    else if (pexelsImage) imageUrl = pexelsImage;
    else return setError("Please select an image.");

    const newPost = {
      username: user.username,
      title,
      desc,
      categories: selectedCategories,
      photo: imageUrl,
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/posts/create`, newPost, { withCredentials: true });
      navigate("/post/" + res.data._id);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-4 py-12 pt-25">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 border-b pb-2">Create a New Blog Post</h2>

        {(imageSource === "pexels" && pexelsImage) || (imageSource === "local" && file) ? (
          <img
            src={imageSource === "local" ? URL.createObjectURL(file) : pexelsImage}
            alt="Preview"
            className="w-full max-h-96 object-cover rounded-xl shadow-md"
          />
        ) : null}

        {error && <div className="text-red-600 font-medium bg-red-100 px-4 py-2 rounded-md">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={imageSource}
              onChange={(e) => {
                setImageSource(e.target.value);
                setFile(null);
                setPexelsImage(null);
              }}
              className="border p-2 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="local">Upload from Device</option>
              <option value="pexels">Choose from Pexels</option>
            </select>

            {imageSource === "local" ? (
              <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded-md w-full sm:w-auto"
              />
            ) : (
              <button
                type="button"
                onClick={() => setShowPexelsModal(true)}
                className="bg-slate-900 text-white px-2 py-1 rounded-md hover:bg-slate-950 transition text-sm"
              >
                Open Pexels Gallery
              </button>
            )}
          </div>

          <input
            type="text"
            placeholder="Enter a captivating title..."
            className="w-full text-xl font-medium border-b-2 border-gray-300 p-2 outline-none focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border p-2 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-green-400"
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
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-green-600 text-white text-sm px-2 py-1 rounded-md hover:bg-green-700 transition"
            >
              Add Category
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <div
                key={cat}
                className="bg-blue-100 text-indigo-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow"
              >
                {cat}
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(cat)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <textarea
            placeholder="Start writing your story..."
            className="w-full min-h-[300px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 text-lg leading-7"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-1 rounded-lg hover:bg-indigo-700 transition text-md w-fit ml-auto"
          >
            Publish Post
          </button>
        </form>
      </div>

      {showPexelsModal && (
        <PexelsModal
          query={title || selectedCategory}
          onClose={() => setShowPexelsModal(false)}
          onSelectImage={(url) => {
            setPexelsImage(url);
            setShowPexelsModal(false);
          }}
        />
      )}
    </div>
  );
};

export default Write;
