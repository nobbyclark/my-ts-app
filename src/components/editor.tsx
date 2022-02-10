import React from "react";
import { Redirect } from "react-router";
import { savePost } from "../api/api";

function Editor() {
  const [redirect, setRedirect] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const { value: title } = elements.namedItem("title") as HTMLInputElement;
    const { value: content } = elements.namedItem(
      "content"
    ) as HTMLInputElement;
    const { value: tags } = elements.namedItem("tags") as HTMLInputElement;
    const newPost = {
      title,
      content,
      tags: tags.split(", "),
      date: new Date().toISOString(),
    };
    setIsSaving(true);
    savePost(newPost).then(
      () => setRedirect(true),
      (response) => {
        setIsSaving(false);
        setError(response.data.error);
      }
    );
  }

  if (redirect) {
    return <Redirect to="/" />;
  } else {
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
        {error ? <div role="alert">{error}</div> : null}
      </form>
    );
  }
}

export { Editor };
