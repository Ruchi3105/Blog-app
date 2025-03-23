import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCat = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.trim()) {
      alert("Category name cannot be empty!");
      return;
    }

    try {
      await axios.post(
        "/api/categories",
        { name: category },
        { withCredentials: true }
      );

      alert("Category added successfully!");
      setCategory(""); // Clear input field
      navigate("/home"); // Redirect after successful addition
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="flex w-screen justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white shadow-xl rounded-lg p-6 m-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-all"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCat;
