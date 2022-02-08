import React from "react";
import { loadGreeting } from "../api/api";

function GreetingLoader() {
  const [greeting, setGreeting] = React.useState("");

  async function loadGreetingForInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { elements } = e.currentTarget;
    const { value } = elements.namedItem("name") as HTMLInputElement;
    const { data } = await loadGreeting(value);
    setGreeting(data.greeting);
  }

  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  );
}

export { GreetingLoader };
