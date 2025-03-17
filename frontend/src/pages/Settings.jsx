import React from "react";

const Settings = () => {
  return (
    <div>
      <div>
        <div>
          <span>Update your account</span>
          <span>Delete</span>
        </div>
        <form action="">
          <label htmlFor="">Profile picture</label>
          <div>
            <img src="" alt="" />
            <label htmlFor=""></label>
            <img src="" alt="" />
          </div>

          <label htmlFor="">Username</label>
          <input type="text" />

          <label htmlFor="">Email</label>
          <input type="email" />

          <label htmlFor="">Password</label>
          <input type="password" />

          <button>Update</button>
          <span>Profile has been updated...</span>
        </form>
      </div>
    </div>
  );
};

export default Settings;
