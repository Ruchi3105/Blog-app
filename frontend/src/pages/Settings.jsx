import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const pf = "http://localhost:5000/images/";

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (password) updatedUser.password = password;
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/api/upload", data,{withCredentials:true});
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/api/users/" + user._id, updatedUser, {
        withCredentials: true,
      });
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div>
      <div>
        <div>
          <span>Update your account</span>
          <span>Delete</span>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="">Profile picture</label>
          <div>
            <img
              src={file ? URL.createObjectURL(file) : pf + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <button>upload</button>
            </label>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </div>

          <label htmlFor="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Update</button>
          {success && <span>Profile has been updated...</span>}
        </form>
      </div>
    </div>
  );
};

export default Settings;
