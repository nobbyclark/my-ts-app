import React from "react";

function Editor() {
  const [isSaving, setIsSaving] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" />
      <label htmlFor="content">Content</label>
      <input id="content" />
      <label htmlFor="tags">Tags</label>
      <input id="tags" />
      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  );
}

export { Editor };
