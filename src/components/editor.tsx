import React from "react";

function Editor() {
  return (
    <form>
      <label htmlFor="title">Title</label>
      <input id="title" />
      <label htmlFor="content">Content</label>
      <input id="content" />
      <label htmlFor="tags">Tags</label>
      <input id="tags" />
      <button type="submit">Submit</button>
    </form>
  );
}

export { Editor };
