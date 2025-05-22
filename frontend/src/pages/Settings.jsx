import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Trash2, UserRoundPen, Upload } from "lucide-react";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
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

    if (password.length > 0) updatedUser.password = password;

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

  return (
    <div className="bg-[url('https://digitalsynopsis.com/wp-content/uploads/2017/02/beautiful-color-gradients-backgrounds-047-fly-high.png')] min-h-screen bg-cover bg-center bg-no-repeat bg-fixed w-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-white rounded-2xl px-10 mx-2 py-10">
        <h1 className="text-2xl mb-4 font-bold">Welcome, {username}</h1>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-3">{success}</p>}
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex sm:flex-col lg:flex-row flex-col justify-center items-center gap-8"
        >
          <div className="flex flex-col justify-center items-center gap-3">
            <img
              className="h-40 w-40 rounded-xl mb-3"
              src={
                file
                  ? URL.createObjectURL(file)
                  : profilePic
              }
              alt=""
            />
            {isEditing && (
              <label htmlFor="fileInput" className="cursor-pointer ">
                <Upload className="bg-black/30 h-7 w-7 p-1 rounded-sm hover:bg-slate-300" />
              </label>
            )}
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              disabled={!isEditing}
            />
          </div>

          <div className="flex flex-col gap-6 justify-center items-center text-sm">
            <div className="flex gap-4 justify-center items-center w-full">
              <label htmlFor="" className="font-semibold">
                Username:
              </label>
              <input
                className="outline-0 border-b-1 px-2  placeholder:text-sm text-gray-600"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                required
                disabled={!isEditing}
              />
            </div>

            <div className="flex gap-4 justify-center items-center ">
              <label htmlFor="" className="font-semibold">
                E-mail:
              </label>
              <input
                className="outline-0 border-b-1 px-2  placeholder:text-sm text-gray-600"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                disabled={!isEditing}
              />
            </div>

            <div className="flex gap-4 justify-center items-center">
              <label htmlFor="" className="font-semibold">
                Password:
              </label>
              <input
                className="outline-0 border-b-1 px-2  placeholder:text-sm text-gray-600"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex p-4 gap-15">
              <UserRoundPen
                className="bg-black/30 h-8 w-8 p-2 rounded-lg transition-all duration-300 hover:rounded-full cursor-pointer text-green-700"
                onClick={handleEdit}
              />
              <Trash2
                className="bg-black/30 h-8 w-8 p-2 rounded-lg transition-all duration-300 hover:rounded-full cursor-pointer text-red-700"
                onClick={handleDeleteAccount}
              />
            </div>

            {isEditing && (
              <button
                type="submit"
                className="bg-slate-800 text-white px-3 py-1 rounded-md hover:bg-slate-900 transition-all duration-300 text-sm"
              >
                {success ? "Updated" : "Update"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
