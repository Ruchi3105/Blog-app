import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [post, setPost] = useState({});
  const pf = "http://localhost:5000/images/";

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    fetchPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `/api/posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        },
        { withCredentials: true }
      );

      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>{post.photo && <img src={pf + post.photo} alt="" />}</div>
      <Link to={`/?users=${post.username}`}>
        <span>{post.username}</span>
      </Link>

      <div>
        <span>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {updateMode ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus
        />
      ) : (
        <h1>{title}</h1>
      )}

      {post && post.username === user?.username && (
        <div>
          {/* <i className="update" />{" "}
          <i className="delete" onClick={handleDelete} /> */}
          {!updateMode && (
            <div>
              <button onClick={() => setUpdateMode(true)}>update</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      )}
      <hr />
      <div>
        {updateMode ? (
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onFocus
          />
        ) : (
          <p>{desc}</p>
        )}
      </div>
      {updateMode && <button onClick={handleUpdate}>Update</button>}
    </div>
  );
};

export default SinglePost;
