import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Write = () => {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: title,
      desc: desc,
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
    } catch (err) {}
  };

  return (
    <div>
      {file && <img src={URL.createObjectURL(file)} alt="" />}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput">
            <i className="fas fa-plus" />
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Tell your story..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default Write;
