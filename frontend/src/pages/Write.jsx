import React from "react";

const Write = () => {
  return (
    <div>
      {/* <img src="" alt="" /> */}
      <form>
        <div>
          <label htmlFor="fileInput">
            {/* <i/> */}
          </label>
          <input type="file" id="fileInput" />
          <input type="text" placeholder="Title" />
        </div>
        <div>
          <textarea placeholder="Tell your story..." type="text"/>
        </div>
        <button type="submit">Publish</button>
      </form>
    </div>
  );
};

export default Write;
