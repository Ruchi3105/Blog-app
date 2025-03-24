import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCat = () => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const trimmedCategory = category.trim();
    if (!trimmedCategory) {
      setError("Category name cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "/api/categories",
        { name: trimmedCategory },
        { withCredentials: true }
      );

      if (res.status === 201) {
        alert("Category added successfully!");
        setCategory(""); // Clear input field
        navigate("/home"); // Redirect after successful addition
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error || "Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-screen justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-xl rounded-lg p-6 m-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add New Category
        </h2>

        {error && <p className="text-red-600 text-center mb-3 font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            disabled={loading}
          />

          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded-md font-medium transition-all ${
              !category.trim() || loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={!category.trim() || loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
