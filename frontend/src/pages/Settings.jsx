import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Trash2, UserRoundPen, Upload } from "lucide-react";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profilePic, setProfilePic] = useState(user?.profilePic || ""); // Store Cloudinary URL

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setProfilePic(
      user.profilePic ||
        "https://res.cloudinary.com/dhaxasdsk/image/upload/v1743003229/defaultProfile_faeqba.jpg"
    ); // Update Cloudinary URL if available
  }, [user]);

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
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        formData
      );
      return res.data.secure_url; // Return the Cloudinary image URL
    } catch (err) {
      setError("Error uploading image to Cloudinary.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username.trim() || !email.trim()) {
      setError("Username and Email cannot be empty.");
      return;
    }

    dispatch({ type: "UPDATE_START" });

    let updatedUser = {
      userId: user._id,
      username,
      email,
    };

    if (password && password.trim().length >= 6) updatedUser.password = password;

    if (file) {
      const imageUrl = await uploadToCloudinary(file);
      if (!imageUrl) return;
      updatedUser.profilePic = imageUrl; // Store Cloudinary URL in the database
    }

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/users/${user._id}`,
        updatedUser,
        { withCredentials: true }
      );
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setProfilePic(res.data.profilePic); // Update state with Cloudinary URL
    } catch (err) {
      setError("Failed to update profile. Try again.");
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/users/${user._id}`,
        {
          withCredentials: true,
        }
      );
      alert(
        "Your account and all posts have been deleted. Sorry to see you go :("
      );
      dispatch({ type: "LOGOUT" });
      window.location.replace("/");
    } catch (err) {
      console.log("Error deleting account: ", err);
    }
  };

  const handleDeleteConfirmed = () => {
    handleDeleteAccount();
    setShowDeleteModal(false);
  };

  return (
  <div className="bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 min-h-screen flex justify-center items-center overflow-auto w-screen">
    <div className="bg-white shadow-xl rounded-2xl px-8 py-10 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] mt-25 mb-20">
      <h1 className="text-2xl font-semibold text-center text-indigo-800 mb-6">
        Welcome, {username}
      </h1>

      {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm text-center mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Pic Upload */}
        <div className="flex flex-col items-center gap-3">
          <img
            className="h-32 w-32 rounded-full object-cover shadow border-2 border-indigo-300"
            src={file ? URL.createObjectURL(file) : profilePic}
            alt="profile"
          />
          {isEditing && (
            <label
              htmlFor="fileInput"
              className="text-indigo-600 hover:text-indigo-800 cursor-pointer text-sm"
            >
              <Upload className="inline-block mr-1" /> Change Profile Picture
            </label>
          )}
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="hidden"
            disabled={!isEditing}
          />
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Leave empty to keep unchanged"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-4">
            <UserRoundPen
              className="h-8 w-8 p-1.5 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 cursor-pointer transition"
              onClick={handleEdit}
              title="Edit"
            />
            <Trash2
              className="h-8 w-8 p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 cursor-pointer transition"
              onClick={() => setShowDeleteModal(true)}
              title="Delete Account"
            />
          </div>

          {isEditing && (
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-700 text-white rounded-md text-sm hover:bg-indigo-800 transition"
            >
              {success ? "Updated" : "Update"}
            </button>
          )}
        </div>
      </form>

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 backdrop-blur-sm z-40"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                Confirm Deletion
              </h2>
              <p className="text-sm text-gray-600 text-center mt-2">
                Your posts will also be deleted. Are you sure you want to delete your account? This cannot be undone.
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleDeleteConfirmed}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
);

};

export default Settings;
