import React from "react";
import { savePost } from "../api/api";

function Editor() {
  const [isSaving, setIsSaving] = React.useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const { value: title } = elements.namedItem("title") as HTMLInputElement;
    const { value: content } = elements.namedItem(
      "content"
    ) as HTMLInputElement;
    const { value: tags } = elements.namedItem("tags") as HTMLInputElement;
    setIsSaving(true);
    savePost({ title, content, tags: tags.split(", ") });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input id="title" name="title" />
      <label htmlFor="content">Content</label>
      <input id="content" name="content" />
      <label htmlFor="tags">Tags</label>
      <input id="tags" name="tags" />
      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  );
}

export { Editor };
