// PexelsModal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

const PexelsModal = ({ query, onClose, onSelectImage }) => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState(query || "");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  const fetchImages = async (search) => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.pexels.com/v1/search", {
        headers: {
          Authorization: import.meta.env.VITE_PEXELS_API_KEY,
        },
        params: {
          query: search,
          per_page: 15,
          page,
        },
      });
      setImages((prev) => (page === 1 ? res.data.photos : [...prev, ...res.data.photos]));
    } catch (err) {
      console.error("Failed to fetch from Pexels:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchImages(searchTerm);
  }, [searchTerm, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages(searchTerm);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 rounded-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✕
        </button>

        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2 m-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search/>
        </form>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedImage(photo.src.large)}
              className={`cursor-pointer border-4 rounded-md overflow-hidden transition-all duration-300 ${
                selectedImage === photo.src.large ? "border-blue-500" : "border-transparent hover:border-gray-300"
              }`}
            >
              <img
                src={photo.src.medium}
                alt={photo.alt}
                className="w-full h-40 object-cover hover:scale-105"
              />
              <div className="text-xs p-1 bg-white text-gray-600">
                Photo by {photo.photographer}
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="mt-4 text-center text-gray-500">Loading...</div>}

        {!loading && images.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900"
            >
              Load More
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => selectedImage && onSelectImage(selectedImage)}
            disabled={!selectedImage}
            className={`px-6 py-2 rounded-md text-white ${
              selectedImage ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Choose Selected Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default PexelsModal;
