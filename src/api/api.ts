import { ErrorInfo } from "react";

const sleep = (time: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, time);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function reportError(error: Error, errorInfo: ErrorInfo) {
  await sleep(1000);
  return { success: true };
}

const greetings = ["Hello", "Hi", "Hey there", `What's up`, "Howdy", `G'day`];

async function loadGreeting(subject: string) {
  return { data: { greeting: `${await fetchRandomGreeting()} ${subject}` } };
}

async function fetchRandomGreeting() {
  await sleep(1000);
  return greetings[Math.floor(Math.random() * greetings.length)];
}

export { reportError, loadGreeting };
