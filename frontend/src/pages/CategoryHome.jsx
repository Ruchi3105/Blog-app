import React, { useContext, useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import axios from "axios";
import { Context } from "../../context/Context";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryHome = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    };
    fetchCategory();
  }, []);
  return (
    <div className="bg-blue-200 w-screen">
      <div className="h-screen w-screen relative top-24 bg-blue-200">
        {categories.length > 0 ? (
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((c, i) => (
                <CategoryCard key={i} category={c} />
              ))}
            </div>
          </div>
        ) : (
          <p className="mx-10">No categories exist for now. Add new categories.</p>
        )}

        <Link
          className="fixed bottom-10 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition"
          to="/add-category"
        >
          <Plus size={24} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryHome;
